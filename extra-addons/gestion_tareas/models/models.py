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