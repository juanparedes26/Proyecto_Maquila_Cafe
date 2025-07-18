"""empty message

Revision ID: e35e983d1374
Revises: e298ce553c52
Create Date: 2025-07-17 10:24:51.422258

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e35e983d1374'
down_revision = 'e298ce553c52'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('maquilas', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cantidad_libras', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('maquilas', schema=None) as batch_op:
        batch_op.drop_column('cantidad_libras')

    # ### end Alembic commands ###
