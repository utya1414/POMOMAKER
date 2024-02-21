class DevelopmentConfig:
    # Flaskの設定
    DEBUG = True

    # SQLAlchemyの設定
    SQLALCHEMY_DATABASE_URI = 'sqlite:///sample.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

   # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sample.db'
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/dbname'
    # username、password、localhost、dbnameはそれぞれMySQLのユーザー名、パスワード、ホスト名、データベース名に置き換える