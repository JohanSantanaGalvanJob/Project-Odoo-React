# -*- coding: utf-8 -*-

from odoo import models, fields, api


class gestion_tareas(models.Model):
    _name = 'gestion_tareas.gestion_tareas'
    _description = 'gestion_tareas.gestion_tareas'

    name = fields.Char()
    description = fields.Text()
    email = fields.Char(string="Email de la empresa")
    phone = fields.Char(string="Teléfono de la empresa")
    address = fields.Char(string="Dirección de la empresa")
    image = fields.Binary(string="Imagen")
    income = fields.Integer(string="Ingresos Anuales")
    bill = fields.Integer(string="Gastos Anuales")
    benefits=fields.Float(string="Beneficios mensuales",compute="_benefits",store=True)
    project = fields.One2many("project.project","company",string="Proyectos")

    @api.depends('income','bill')
    def _benefits(self):
        for record in self:
            record.benefits = float(record.income-record.bill) / 12

class hiring_projects(models.Model):
    _name = "project.project"
    _inherit = "project.project"

    company = fields.Many2one("gestion_tareas.gestion_tareas", string="Empresa", ondelete="cascade")

class empresas_johan_tasks(models.Model):
    _name = 'project.task'
    _inherit = 'project.task'
    kanban_state = fields.Selection([
        ('normal', 'In Progress'),
        ('done', 'Ready'),
        ('blocked', 'Blocked'),
        ('unassigned', 'Not Assigned'),
        ('delayed','Delayed')], string='Kanban State',
        copy=False, default='normal', required=True)

class ProjectStage(models.Model):
    _inherit = 'project.task.type'
    name = fields.Char(string="Name", required=True)
    legend_unassigned = fields.Char(
        'Grey Kanban Label', default=lambda s: ('Not Assigned'), translate=True, required=True,
        help='Override the default value displayed for the blocked state for kanban selection, when the task or issue is in that stage.')
    legend_delayed = fields.Char(
        'Orange Kanban Label', default=lambda s: ('Delayed'), translate=True, required=True,
        help='Override the default value displayed for the blocked state for kanban selection, when the task or issue is in that stage.')

class Project(models.Model):
    _inherit = 'project.project'
    
    stage_id = fields.Many2one(
        'project.task.type',
        # string='Stage',
        # default=lambda self: self.env.ref('gestion_tareas.task_status_sin_iniciar'),
    )