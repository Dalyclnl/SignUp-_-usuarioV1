"""empty message

Revision ID: d6bd066b0077
Revises: 4cf3f7e47c1c
Create Date: 2023-01-06 22:35:33.954692

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6bd066b0077'
down_revision = '4cf3f7e47c1c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('firstname', sa.String(length=120), nullable=False))
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
        batch_op.drop_column('firstname')

    # ### end Alembic commands ###
