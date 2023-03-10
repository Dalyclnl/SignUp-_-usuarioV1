"""empty message

Revision ID: 4cf3f7e47c1c
Revises: d6338a1044db
Create Date: 2023-01-06 21:17:21.819515

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4cf3f7e47c1c'
down_revision = 'd6338a1044db'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('lastname', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('city', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('zipcode', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('userprofesional', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('userclient', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('userclient')
        batch_op.drop_column('userprofesional')
        batch_op.drop_column('zipcode')
        batch_op.drop_column('city')
        batch_op.drop_column('lastname')
        batch_op.drop_column('name')

    # ### end Alembic commands ###
