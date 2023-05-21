from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from accounts.models import Comment
from products.models import Product, Size, Category
from faker import Faker
from django.contrib.contenttypes.models import ContentType
fake = Faker("uk_UA")


def create_fake_users(num_users=1):
    for _ in range(num_users):
        username = fake.user_name()
        email = fake.email()
        password = fake.password()
        first_name = fake.first_name()
        last_name = fake.last_name()
        User.objects.create_user(username=username, email=email,
                                 password=password, first_name=first_name,
                                 last_name=last_name)


def create_fake_comments(num_comments=1):
    try:
        users = User.objects.all()
        products = Product.objects.all()

        if not users.exists():
            raise ObjectDoesNotExist(
                "No users found in the database. Firstly create user.")

        if not products.exists():
            raise ObjectDoesNotExist(
                "No products found in the database. Firstly create product.")

        for _ in range(num_comments):
            fake_text = fake.paragraph(nb_sentences=2,
                                       variable_nb_sentences=True)

            user = users.order_by('?').first()
            product = products.order_by('?').first()

            Comment.objects.create(
                user=user,
                text=fake_text,
                content_type=ContentType.objects.get_for_model(Product),
                object_id=product.id
            )

    except ObjectDoesNotExist as e:
        print(f"Error: {str(e)}")


def create_fake_categories():
    categories = {
        "Чоловіки": ["Сукні", "Футболки", "Штани", "Светри", "Шорти"],
        "Жінки": ["Сукні", "Футболки", "Штани", "Светри", "Шорти"],
        "Дівчатка": ["Сукні", "Футболки", "Штани", "Светри", "Шорти"],
        "Хлопчики": ["Сукні", "Футболки", "Штани", "Светри", "Шорти"],
    }

    for main_category, sub_categories in categories.items():
        parent = Category.objects.create(
            name=main_category,
            parent=None,
            slug=fake.slug()
        )

        for sub_category in sub_categories:
            Category.objects.create(
                name=sub_category,
                parent=parent,
                slug=fake.slug()
            )


def create_fake_products(num_products=1):
    categories = Category.objects.all()
    if not categories.exists():
        print(
            "No categories found in the database. Please create categories first.")
        return

    for _ in range(num_products):
        name = fake.name()
        price = fake.pydecimal(left_digits=3, right_digits=2, min_value=0.01)
        description = fake.paragraph(nb_sentences=3, variable_nb_sentences=True)
        slug = fake.slug()
        category = Category.objects.order_by('?').first()

        Product.objects.create(
            name=name,
            price=price,
            description=description,
            slug=slug,
            category=category
        )


def create_fake_sizes():
    sizes = ["S", "M", "L"]

    products = Product.objects.all()
    for product in products:
        for size in sizes:
            stock_quantity = fake.random_int(min=0, max=100)

            Size.objects.create(
                size=size,
                stock_quantity=stock_quantity,
                product=product
            )