from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist
from faker import Faker

from accounts.models import Comment
from products.models import Product, Size, Category


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
        "Одяг": ["Сукні", "Футболки", "Штани", "Светри", "Шорти"]
    }

    parent = Category.objects.create(name="Одяг", parent=None, slug=fake.slug())
    for category in categories:
        for sub_category in categories[category]:
            Category.objects.create(name=sub_category, parent=parent, slug=fake.slug())


def create_fake_products(num_products=1):
    categories = Category.objects.exclude(parent__isnull=True).all()
    if not categories.exists():
        print("No categories found in the database. Please create categories first.")
        return

    sex_and_age_choices = ["Чоловіки", "Жінки", "Хлопчики", "Дівчатка"]
    season_choices = ["Осінь/Зима", "Весна/Літо"]

    for _ in range(num_products):
        price = fake.pydecimal(left_digits=3, right_digits=2, min_value=0.01)
        description = fake.paragraph(nb_sentences=3, variable_nb_sentences=True)
        slug = fake.slug()
        category = fake.random_element(categories)
        name = category.name
        sex_and_age = fake.random_element(sex_and_age_choices)
        season = fake.random_element(season_choices)

        Product.objects.create(
            name=name,
            price=price,
            description=description,
            slug=slug,
            category=category,
            sex_and_age=sex_and_age,
            season=season
        )


def create_fake_sizes():
    sizes = ["XS", "S", "M", "L", "XL"]
    colors = ["Білий", "Червоний", "Синій", "Зелений", "Жовтий", "Рожевий", "Помаранчевий"]

    products = Product.objects.all()
    for product in products:
        for size in sizes:
            for _ in range(2, 4):
                color = fake.random_element(colors)
                stock_quantity = fake.random_int(min=0, max=100)

                Size.objects.create(
                    size=size,
                    color=color,
                    stock_quantity=stock_quantity,
                    product=product
                )
