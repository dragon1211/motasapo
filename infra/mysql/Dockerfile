FROM mysql/mysql-server:8.0

ENV MYSQL_DATABASE=motasapo_db \
    MYSQL_USER=motasapo_user \
    MYSQL_PASSWORD='d#t|KTvR/X%kj53T_FF%aXKM*/QqfHPXD+y+' \
    MYSQL_ROOT_PASSWORD='d#t|KTvR/X%kj53T_FF%aXKM*/QqfHPXD+y+' \
    TZ=Asia/Tokyo

COPY ./my.cnf /etc/my.cnf
RUN chmod 644 /etc/my.cnf
# COPY ./my.cnf /etc/mysql/conf.d/my.cnf
# RUN chmod 644 /etc/mysql/conf.d/my.cnf
