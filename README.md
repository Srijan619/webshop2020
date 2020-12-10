### Full Stack Web Shop with Django and ReactJS

The webshop is a  web  application where  users  can buy and  sell  items.An Item can have two states:  *available*  and  *sold*.  There  are  2  kinds  of  users: *registered* and *unregistered*. Unregistered  users  are  anonymous  and can only browse  or  search  available  items. Registered  users  are  authenticated  and  can  additionally  buy, sell and view their own inventory.

### Functional Features

1. Landing Page (/) (Served by Django), Shop Page (/main) (SPA using React)
2. Automatic DB population (Generate random Users and Items to Sell)
3. Browse and Search Items (Except the ones listed by the user itself)
4. Create Account
5. Login / Edit Account
6. Add Items to sell
7. Display Inventory (Visualize own items: on sale, sold, and purchased)
8. Edit Item (Just price ATM)
9. Add to cart
10. Remove from cart
11. Pay (Simulated pay with no payment method)
    - If the price is changed / Item is no longer available concurrently, a notification is shown and the item cannot be checkout with old information.


### Non-Functional Features

1. Security provided bt JWT
2. Uses Material UI
