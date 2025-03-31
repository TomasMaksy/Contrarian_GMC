import pandas as pd
import numpy as np
import networkx as nx
from scipy.optimize import linear_sum_assignment

# Load preferences from CSV
def load_preferences(file_path):
    df = pd.read_csv(file_path)
    return df

# Create a weighted bipartite graph
def create_graph(df, priority_orgs, unavailable_slots):
    G = nx.Graph()
    investors = df[df['Type'] == 'Investor']
    startups = df[df['Type'] == 'Startup']
    
    for _, investor in investors.iterrows():
        for i in range(1, 27):  # Preferences 1-26
            startup_name = investor[f'Preference {i}']
            if not pd.isna(startup_name):
                weight = 27 - i  # Higher weight for top choices
                if investor['Organisation'] in priority_orgs:
                    weight += 20  # Boost weight for priority participants
                G.add_edge(investor['Organisation'], startup_name, weight=weight)
    
    return G

# Solve optimal assignment
def optimize_matching(G):
    cost_matrix = []
    investors = list(set([n for n in G.nodes if G.degree(n) > 0 and 'Investor' in n]))
    startups = list(set([n for n in G.nodes if G.degree(n) > 0 and 'Startup' in n]))
    
    for investor in investors:
        row = []
        for startup in startups:
            if G.has_edge(investor, startup):
                row.append(-G[investor][startup]['weight'])  # Minimize cost
            else:
                row.append(-1000)  # Large penalty for no connection
        cost_matrix.append(row)
    
    cost_matrix = np.array(cost_matrix)
    row_ind, col_ind = linear_sum_assignment(cost_matrix)
    
    matches = [(investors[i], startups[j]) for i, j in zip(row_ind, col_ind)]
    return matches

# Assign time slots
def assign_time_slots(matches, unavailable_slots, num_slots=10):
    schedule = {p: [None] * num_slots for p, _ in matches}
    schedule.update({p: [None] * num_slots for _, p in matches})
    
    for i, (investor, startup) in enumerate(matches):
        assigned = False
        for t in range(num_slots):
            if t not in unavailable_slots.get(investor, []) and t not in unavailable_slots.get(startup, []):
                schedule[investor][t] = startup
                schedule[startup][t] = investor
                assigned = True
                break
        if not assigned:
            print(f"Warning: Could not fully assign {investor} and {startup}")
    
    return schedule

# Main function
def main(csv_path, priority_orgs, unavailable_slots):
    df = load_preferences(csv_path)
    G = create_graph(df, priority_orgs, unavailable_slots)
    matches = optimize_matching(G)
    schedule = assign_time_slots(matches, unavailable_slots)
    return schedule





###### DOCS

# upload a CSV of the preferences as a `csv_path`
# add priority_orgs as priority_orgs = ["VIP Investor", "Top Startup"]  # Organizations that must get their top 5-6 meetings
# add unavailable_slots as unavailable_slots = {
#    "Investor A": [2, 5],  # Investor A is unavailable for slots 2 and 5
#    "Startup X": [3, 7],   # Startup X is unavailable for slots 3 and 7
#}

#New push