def total_price(items):
    """items: list of (name, price, qty) tuples."""
    total = 0
    for name, price, qty in items:
        total += price * qty
    return total
