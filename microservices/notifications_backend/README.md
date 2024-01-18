
# Run development server
```bash
python manage.py runserver 8080
```

# Create a new app (module) for polls
```bash
python manage.py startapp polls
```

# Migrations
Remember the three-step guide to making model changes:
1. Change your models (in models.py).
2. Run `python manage.py makemigrations` to create migrations for those changes
3. Run `python manage.py migrate` to apply those changes to the database.

### Run migrations
```bash
python manage.py migrate
```

### By running makemigrations, you’re telling Django that you’ve made some changes to your models (in this case, you’ve made new ones) and that you’d like the changes to be stored as a migration. 
```bash
python manage.py makemigrations polls
```

### The sqlmigrate command takes migration names and returns their SQL
```bash
python manage.py sqlmigrate polls 0001
```

### If you’re interested, you can also run python manage.py check; this checks for any problems in your project without making migrations or touching the database.
```bash
python manage.py check
```

### To invoke the Python shell, use this command:
```bash
$ python manage.py shell

$ from polls.models import Choice, Question  # Import the model classes we just wrote.

# No questions are in the system yet.
$ Question.objects.all() # <QuerySet []>

# Create a new Question.
# Support for time zones is enabled in the default settings file, so
# Django expects a datetime with tzinfo for pub_date. Use timezone.now()
# instead of datetime.datetime.now() and it will do the right thing.
$ from django.utils import timezone
$ q = Question(question_text="What's new?", pub_date=timezone.now())

# Save the object into the database. You have to call save() explicitly.
$ q.save()

# Now it has an ID.
$ q.id # 1

# Access model field values via Python attributes.
$ q.question_text # "What's new?"
$  q.pub_date # datetime.datetime(2012, 2, 26, 13, 0, 0, 775217, tzinfo=datetime.timezone.utc)

# Change values by changing the attributes, then calling save().
$ q.question_text = "What's up?"
$ q.save()

# objects.all() displays all the questions in the database.
$ Question.objects.all() # <QuerySet [<Question: Question object (1)>]>
```

# Admin Site
### Create admin user
```bash
python manage.py createsuperuser
>>> ricardovelazquez
>>> ricardo.velazquez.serna@gmail.com
>>> Temporal2024#
```

# Tests
1. `manage.py` test polls looked for tests in the polls application
2. it found a subclass of the `django.test.TestCase` class
3. it created a special database for the purpose of testing
4. it looked for test methods - ones whose names begin with `test`
5. in `test_was_published_recently_with_future_question` it created a Question instance whose pub_date field is 30 days in the future

### Run poll tests
```bash
python manage.py test polls
```

### Django test client. [docs](https://docs.djangoproject.com/en/5.0/intro/tutorial05/)
`setup_test_environment()` installs a template renderer which will allow us to examine some additional attributes on responses such as `response.context` that otherwise wouldn’t be available. Note that this method does not set up a test database, so the following will be run against the existing database and the output may differ slightly depending on what questions you already created. You might get unexpected results if your TIME_ZONE in settings.py isn’t correct. If you don’t remember setting it earlier, check it before continuing.
```bash
  python manage.py shell
  from django.test.utils import setup_test_environment
  setup_test_environment()
  from django.test import Client
  client = Client()
  response = client.get("/")
  response.status_code
  from django.urls import reverse
  response = client.get(reverse("polls:index"))
  response.status_code
  response.context["latest_question_list"]
```
