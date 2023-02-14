
from odoo import http
from odoo.http import request


class GestionTareas(http.Controller):


    @http.route('/api/projectStage/getAll', auth='public',type="json",csrf=True, cors='*')
    def listProject(self, **kw):
        gestion_tareas_rec = request.env['project.task.type'].sudo().search([])
        gestion_tareas = []
        for rec in gestion_tareas_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
            }
            gestion_tareas.append(vals)
            print ("GET ALL ----> ", gestion_tareas)
        return {'status': 200, 'response': gestion_tareas, 'message': 'Success'}

    @http.route('/api/tasks/getAll', auth='public',type="json",csrf=True, cors='*')
    def list(self, **kw):
        gestion_tareas_rec = request.env['project.task'].sudo().search([])
        gestion_tareas = []
        for rec in gestion_tareas_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'project_id': rec.project_id.name,
                'description': rec.description,
                'kanban_state': rec.kanban_state_label,
                'stage':rec.stage_id.id,
                'user': rec.user_id.name,
            }
            gestion_tareas.append(vals)
            print ("GET ALL ----> ", gestion_tareas)
        return {'status': 200, 'response': gestion_tareas, 'message': 'Success'}
    
    @http.route('/api/tasks/get/<int:rec_id>', auth='public',type="json",csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['project.task']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
                'id': rec.id,
                'name': rec.name,
                'project_id': rec.project_id.name,
                'description': rec.description,
                'kanban_state': rec.kanban_state_label,
                'stage': rec.stage_id.name,
                'user': rec.user_id.name,
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/tasks/findByProject', type="json", auth="public", csrf=True, cors='*')
    def findByName(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['name'] + '%'
        gestion_tareas_rec = request.env['project.task'].sudo().search([('name', '=ilike', reg_exp)])
        gestion_tareas = []
        for rec in gestion_tareas_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'project_id': rec.project_id.name,
                'description': rec.description,
                'kanban_state': rec.kanban_state_label,
                'stage': rec.stage_id.name,
                'user': rec.user_id.name,
            }
            gestion_tareas.append(vals)
        return {'status': 200, 'response': gestion_tareas, 'message': 'Success'}
    

    @http.route('/api/tasks/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        task_to_post = request.env["project.task"]
        record = task_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/tasks/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        task_to_put = request.env["project.task"]
        rec = task_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    # @http.route('/api/tasks/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    # def delete(self, rec_id):
    #     task_to_del_rec = request.env["project.task"]
    #     rec = task_to_del_rec.browse(rec_id).sudo().ensure_one()
    #     is_deleted = rec.unlink()
    #     res = {
    #         "result": is_deleted
    #     }
    #     data = {'status': 200, 'response': res, 'message': 'Success'}
    #     return data

    # @http.route('/api/tasks/removeAll', type='json', auth='public', csrf=True, cors='*')
    # def deleteAll(self):
    #     task_to_del = request.env["project.task"].sudo()
        
    #     # .with_context(active_test=False) to also find inactive records.
    #     all_tasks = task_to_del.with_context(active_test=False).search([])
    #     is_deleted = all_tasks.unlink()
    #     res = {
    #         "result": is_deleted
    #     }
    #     data = {'status': 200, 'response': res, 'message': 'Success'}
    #     return data
    

