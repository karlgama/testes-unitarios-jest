import Editora from '../../models/editora';

describe('Testando o modelo Editora',()=>{
    const objeditora = {
        nome: 'CDC',
        cidade:'Sao Paulo',
        email:'c@c.com'
    };

    it('Deve instanciar uma nova editora',()=>{
        const editora = new Editora(objeditora);

        expect(editora).toEqual(
            expect.objectContaining(objeditora)
            )
    });

    it.skip('Deve salvar editora no BD',()=>{
        const editora = new Editora(objeditora);

        editora.salvar()
        .then((dados)=>{
            expect(dados.nome).toBe('CDC');
        })
    });
    
    it.skip('Deve salvar editora no BD',async ()=>{
        const editora = new Editora(objeditora);

        const dados = await editora.salvar();        

        const retornado = await Editora.pegarPeloId(dados.id);

        expect(retornado).toEqual(
            expect.objectContaining({
                id:expect.any(Number),
                ...objeditora,
                created_at:expect.any(String),
                updated_at:expect.any(String)
            })
        )
    });
    
    it('Deve simular chamada ao BD',async ()=>{
        const editora = new Editora(objeditora);
        editora.salvar = jest.fn().mockReturnValue({
            id:10,
            ...objeditora,
            created_at:'',
            updated_at:'',
        });
        const retorno = await editora.salvar();        

        // const retornado = await Editora.pegarPeloId(dados.id);

        expect(retorno).toEqual(
            expect.objectContaining({
                id:expect.any(Number),
                ...objeditora,
                created_at:expect.any(String),
                updated_at:expect.any(String)
            })
        )
    });
})
