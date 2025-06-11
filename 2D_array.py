import numpy as np

matrix= np.array([[2,4],[6,7]])

print("Matrix:")
print(matrix)  #print the matrix

print("Transpose:")
print(matrix.T) # Transpose of the matrix

result = np.dot(matrix, matrix)
print("Matrix multiplied by itself:")
print(result) # Matrix multiplication (dot product)
