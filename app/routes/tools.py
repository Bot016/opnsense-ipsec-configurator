from flask import Blueprint, render_template

bp = Blueprint('tools', __name__)

@bp.route('/')
def tools_home():
    return render_template('tools.html')
