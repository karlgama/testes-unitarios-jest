import app from '../../app';
import request from 'supertest';
let server;

beforeEach(()=>{
    const port= 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('Get em /editoras',()=>{
    it('Deve retornar uma lsita de editoras',async()=>{
        const res = await request(app)
            .get('/editoras')
            .expect(200);
    
        expect(res.body[0].email).toEqual('e@e.com');
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
});

describe('Delete em /editoras',()=>{
    it('deletar o recurso adicionado',async()=>{
        await request(app)
        .delete(`/editoras/${idResposta}`)
        .expect(200);
    })
});    