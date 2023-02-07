# -*- coding: utf-8 -*-
{
    'name': "Gestión de tareas",

    'summary': """
        Módulo para ser conectado con React para la gestión de tareas por parte de los proyectos.""",

    'description': """
        Long description of module's purpose
    """,

    'author': "Johan Santana Galván & Kevin Rodríguez Valentín",
    'website': "https://github.com/JohanSantanaGalvanJob",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','project'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'security/security.xml',
        'security/ir.model.access.csv',
        'reports/company_report.xml',
        'reports/company_report_view.xml',
        'data/project_status_data.xml',
        'data/project_task.xml'
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],

    'application': 'True',
}
