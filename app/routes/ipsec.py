from flask import Blueprint, render_template, current_app
from app.utils.api import api_call

bp = Blueprint('ipsec', __name__)

@bp.route('/')
def ipsec_home():
    config = current_app.config['CONFIG']
    default_local_subnet = config.get("default_local_subnet") or None
    default_local_identifier = config.get("default_local_identifier") or None
    
    endpoint = "ipsec/connections/search_connection"
    response = api_call(endpoint)

    # Extraia apenas o necessário para o select (exemplo: uuid e description)
    tunnel_options = []
    for row in response.get("rows", []):
        tunnel_options.append({
            "uuid": row["uuid"],
            "description": row["description"]
        })
    

    return render_template('ipsec.html', 
                        tunnel_options=tunnel_options, 
                        default_local_subnet=default_local_subnet, 
                        default_local_identifier=default_local_identifier)
