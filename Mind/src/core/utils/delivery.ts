export const getDeliveryEstimate = (productId: string): string => {
    // Deterministic hash based on productId to ensure consistency across renders
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const options = [
        "Tomorrow",
        "in 2 days",
        "in 3 days",
        "in 4 days",
        "in 5 days"
    ];
    return options[hash % options.length];
};
