import app from '../../app';
import request from 'supertest';
import { describe, expect, it,jest } from '@jest/globals';


let server;

beforeEach(()=>{
    const port= 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('Get em /editoras',()=>{
    it('Deve retornar uma lista de editoras',async()=>{
        const res = await request(app)
            .get('/editoras')
            .expect(200);
    
        expect(res.body[0].email).toEqual('m@m.com');
        });
});

let idResposta;

describe('Post em /editores',()=>{
    it('Deve adicionar uma nova editora',async()=>{
        const res = await request(app)
            .post('/editoras')
            .send({
                nome: 'CDC',
                cidade:'Sao Paulo',
                email:'c@c.com'
            })
            .expect(201);        
        idResposta=res.body.content.id;
    });
    it('deve não adicionar nada oa passaro body vazio',async()=>{
        await request(app)
        .post('/editoras')
        .send({})
        .expect(400);
    })    
});

describe('Put em /editoras/id',()=>{
    test.each([
        {nome:'casa do codigo'},
        {cidade:'sp'},
        {email:'cdc@cdc.com'},
    ])
    ('deve alterar o campo nome',async (param)=>{
        const req = {request};
        const spy = jest.spyOn(req,'request');
        
        await req.request(app)
            .put(`/editoras/${idResposta}`)
            .send(param)
            .expect(204);
        expect(spy).toHaveBeenCalled();
    })
})

describe('Delete em /editoras',()=>{
    it('deletar o recurso adicionado',async()=>{
        await request(app)
        .delete(`/editoras/${idResposta}`)
        .expect(200);
    })
});

