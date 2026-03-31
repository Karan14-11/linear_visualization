import numpy as np
import pandas as pd
import scipy.sparse as sp

def extract_coauthor_cs(npz_path):
    print("Loading NPZ file...")
    with np.load(npz_path, allow_pickle=True) as data:
        # Reconstruct the adjacency matrix (the graph edges)
        adj_matrix = sp.csr_matrix(
            (data['adj_data'], data['adj_indices'], data['adj_indptr']), 
            shape=data['adj_shape']
        )
        # Extract the node labels (the CS sub-fields)
        labels = data['labels']
    
    # 1. Extract Unweighted Edges
    # We use triu (upper triangle) to avoid duplicating A->B and B->A
    print("Extracting unweighted edges...")
    sources, targets = sp.triu(adj_matrix).nonzero()
    edges_df = pd.DataFrame({'source': sources, 'target': targets})
    
    # 2. Extract Metadata
    # The labels are integers (0 to 14) representing 15 CS sub-fields. 
    print("Extracting metadata...")
    nodes_df = pd.DataFrame({
        'node_id': range(len(labels)),
        'cs_field_class': labels
    })
    
    # Export for your visualization tool
    edges_df.to_csv("coauthor_cs_edges.csv", index=False)
    nodes_df.to_csv("coauthor_cs_nodes.csv", index=False)
    
    print(f"Done! Exported {len(nodes_df)} nodes and {len(edges_df)} edges.")

# Run it
if __name__ == "__main__":
    extract_coauthor_cs("ms_academic_cs.npz")