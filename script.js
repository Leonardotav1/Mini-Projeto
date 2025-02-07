const apiUrl = 'http://localhost:3000/locais';

        document.getElementById('local-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const local = {
                titulo: document.getElementById('titulo').value,
                descricao: document.getElementById('descricao').value,
                foto: document.getElementById('foto').value
            }
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(local) 
            });

            if (response.ok) {
                carregarLocais();
                this.reset();
            }
        })  

        async function carregarLocais() {
            const response = await fetch(apiUrl);
            const locais = await response.json();
            const lista = document.getElementById('locais-lista');
            lista.innerHTML = '';

            locais.forEach(local => {
                const div = document.createElement('div');
                div.classList.add('local');
                div.innerHTML = `
                    <h3>${local.titulo}</h3>
                    <p>${local.descricao}</p>
                    <img src="${local.foto}" alt="${local.titulo}">
                    <div class="actions">
                        <button onclick="excluirLocal('${local.id}')">Excluir</button>
                        <button onclick="editarLocal('${local.id}')">Editar</button>
                    </div>
                `;
                lista.appendChild(div);
            });
        }

        async function editarLocal(id){
            const titulo = prompt("Insira um novo Título:")
            const descricao = prompt("Insira um nova Descriçãp:")
            const imagem = prompt("Insira a URL da nova Imagem")
            const localAtt = {
                titulo:titulo,
                descricao:descricao,
                foto:imagem
            }
            fetch(`${apiUrl}/${id}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localAtt)
            })
            .then(data => data.json())
            .then(()=>{
                carregarLocais()
            })
            .catch(error => console.log("Erro:",error))
        }

        async function excluirLocal(id) {
            fetch(`${apiUrl}/${id}`,{
                method: 'DELETE'
            })
            .then(()=>{
                console.log("");
            })
            .catch((error)=>{
                console.log(error);
            })
        }   
        
        carregarLocais();