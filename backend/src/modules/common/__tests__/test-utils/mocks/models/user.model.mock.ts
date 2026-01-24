export const createMockUserModel = () => {
    // Create a complete mock
    const mockModel: any = jest.fn(); // for "new userModel"

    // Helper to create an object with .exec()
    const mockExec = (value: any) => ({
        exec: jest.fn().mockResolvedValue(value)
    });

    // Mongoose Model methods
    mockModel.find = jest.fn().mockReturnValue(mockExec([])); // Return an array
    mockModel.findById = jest.fn().mockReturnValue(mockExec(null)); // Return only one document
    mockModel.findOne = jest.fn().mockReturnValue(mockExec(null));
    mockModel.findByIdAndUpdate = jest.fn().mockReturnValue(mockExec(null));
    mockModel.findByIdAndDelete = jest.fn().mockReturnValue(mockExec(null));

    // Method for instances
    mockModel.prototype.save = jest.fn();

    return mockModel;
};