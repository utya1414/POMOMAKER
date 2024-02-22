# Flask アプリでデータベースを使うための設定
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)
    migrate = Migrate(app, db)
    with app.app_context():
        db.create_all()
        db.session.commit()
        db.session.close()
        print('DB initialized')