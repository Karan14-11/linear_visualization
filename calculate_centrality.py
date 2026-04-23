import pandas as pd
import networkx as nx
import os
import random
import time

def fast_closeness_centrality(G, k=100):
    if G.number_of_nodes() <= k:
        return nx.closeness_centrality(G)
    
    # Use random sampling of K nodes
    sample_nodes = random.sample(list(G.nodes()), k)
    distance_sum = dict.fromkeys(G.nodes(), 0)
    reachable_count = dict.fromkeys(G.nodes(), 0)
    
    for s in sample_nodes:
        # compute shortest path lengths from s to all reachable nodes
        lengths = nx.single_source_shortest_path_length(G, s)
        for target, dist in lengths.items():
            distance_sum[target] += dist
            reachable_count[target] += 1
            
    clo = {}
    for n in G.nodes():
        if reachable_count[n] > 0 and distance_sum[n] > 0:
            avg_dist = distance_sum[n] / reachable_count[n]
            clo[n] = 1.0 / avg_dist
        else:
            clo[n] = 0.0
            
    return dict(clo)

def process_dataset(dir_name):
    print(f"\n--- Processing {dir_name} ---")
    edges_path = os.path.join(dir_name, 'node_to_node_link_data.csv')
    nodes_path = os.path.join(dir_name, 'facebook_data_transformed_new.csv')
    
    if not os.path.exists(edges_path) or not os.path.exists(nodes_path):
        print("Data files not found. Skipping.")
        return
        
    edges_df = pd.read_csv(edges_path)
    nodes_df = pd.read_csv(nodes_path)
    
    # Build Graph
    G = nx.Graph()
    # Ensure all nodes are present even if isolated
    G.add_nodes_from(nodes_df['node'].tolist())
    
    edge_list = []
    if 'source' in edges_df.columns and 'target' in edges_df.columns:
        edge_list = zip(edges_df['source'], edges_df['target'])
    elif '0' in edges_df.columns and '1' in edges_df.columns:
        edge_list = zip(edges_df['0'], edges_df['1'])
    else:
        # Assumes cols [index, source, target] or something
        cols = edges_df.columns
        if len(cols) >= 3:
            edge_list = zip(edges_df[cols[1]], edges_df[cols[2]])

    G.add_edges_from(edge_list)
    print(f"Graph constructed: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")
    
    # 1. Eigenvector Centrality
    print("Computing Eigenvector Centrality...")
    start = time.time()
    try:
        eig = nx.eigenvector_centrality(G, max_iter=2000, tol=1e-04)
    except nx.PowerIterationFailedConvergence:
        print("Eigenvector failed to converge, using PageRank instead.")
        eig = nx.pagerank(G)
    print(f"Done in {time.time()-start:.2f}s")
        
    # 2. Approximate Betweenness Centrality
    print("Computing Betweenness Centrality (approx k=100)...")
    start = time.time()
    betw = nx.betweenness_centrality(G, k=100, seed=42)
    print(f"Done in {time.time()-start:.2f}s")
    
    # 3. Approximate Closeness Centrality
    print("Computing Closeness Centrality (approx k=100)...")
    start = time.time()
    clo = fast_closeness_centrality(G, k=100)
    print(f"Done in {time.time()-start:.2f}s")
    
    # Update dataframe
    nodes_df['eign'] = nodes_df['node'].map(eig).fillna(0)
    nodes_df['betwness'] = nodes_df['node'].map(betw).fillna(0)
    nodes_df['closeness'] = nodes_df['node'].map(clo).fillna(0)
    
    nodes_df.to_csv(nodes_path, index=False)
    print(f"Successfully updated centralities in {nodes_path}")

if __name__ == "__main__":
    for d in ['temp_data_1', 'temp_data_2', 'temp_data_3', 'temp_data_4']:
        process_dataset(d)
