inventory = {}

def add_item(name, quantity, price):
    if quantity < 0 or price < 0:
        print("Quantity and price must be non-negative.")
        return
    
    inventory[name] = {"quantity": quantity, "price": price}
    print(f"Item '{name}' added successfully.")

def update_stock(name, quantity):
    if name not in inventory:
        print(f"Error: Item '{name}' not found.")
        return
    
    if inventory[name]["quantity"] + quantity < 0:
        print("Error: Stock cannot go below zero.")
        return
    
    inventory[name]["quantity"] += quantity
    print(f"Stock updated for '{name}'.")

def calculate_total_value():
    total = 0
    for item in inventory:
        total += inventory[item]["quantity"] * inventory[item]["price"]
    return total

def remove_item(name):
    if name not in inventory:
        print(f"Error: Item '{name}' not found.")
        return
    
    del inventory[name]
    print(f"Item '{name}' removed successfully.")
