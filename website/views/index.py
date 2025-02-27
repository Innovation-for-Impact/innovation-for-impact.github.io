"""
Website routing
URLs include:
/
"""
import os
import flask
import arrow
import website
import website.config
import website.views
import website.model

LOGGER = flask.logging.create_logger(website.app)

@website.app.route('/')
def show_index():
    """Create the index page."""
    context = {
        "linkedin": website.config.LINKEDIN,
        "instagram": website.config.INSTAGRAM
    }
    return flask.render_template("index.html", **context)