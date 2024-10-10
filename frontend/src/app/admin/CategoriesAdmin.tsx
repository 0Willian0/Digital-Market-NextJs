import React, { useEffect } from "react";
import { useState } from "react";
import { baseApiUrl } from "../config/global";
import axios from "axios";
import { notifyError, notifySuccess } from "../config/msgs";
import { Form, Row, Col, Button, Table } from "react-bootstrap";


interface Category{
    id?:number
    name?:string
    path?:string
    parentId?:string
}

const CategoriesAdmin: React.FC = ()=>{
    const [mode, setMode] = useState('save')
    const [category, setCategory] = useState<Category>({})
    const [categories, setCategories] = useState<Category[]>([])

    const fields = [
        {key: 'id', label:'Codigo'},
        {key: 'name', label: 'Nome'},
        {key: 'path', label: 'Caminho'},
        {key: 'actions', label: 'Ações'}
    ]

    const loadCategories = async()=>{
        try{
            const url = `${baseApiUrl}/categories`
            const res = await axios.get(url)
            setCategories(res.data.categories || res.data)
        }catch(erro){
            console.error('Erro ao carregar categorias:',erro)
        }
    }

    const reset = ()=>{
        setMode('save')
        setCategory({})
        setCategories([])
    }

    const save = async ()=>{
        const method = category.id ? 'post' : 'put'
        const id = category.id ? `${category.id}` : ''

        try{
            await axios[method](`${baseApiUrl}/categories${id}`, category)
            notifySuccess('Categoria salvo com sucesso!')
            reset()
        }catch(error){
            notifyError('Erro ao salvar Categoria')
        }
    }

    const remove = async()=>{
        if(window.confirm('Tem certeza que deseja remover esta Categoria?')){
            try{
                await axios.delete(`${baseApiUrl}/categories/${category.id}`)
                notifySuccess('Categoria removido com sucesso!')
                reset()
            }catch(erro){
                notifyError('Error ao remover Categoria')
            }
        }
    }

    const loadCategory = (selectedCategory: Category, mode='save')=>{
        setMode(mode)
        setCategory({...selectedCategory})
    }

    useEffect(()=>{
        loadCategories()
    },[])

    return(
        <div className="categories-admin">
            <Form>
                <input type="hidden" value={category.id || ''}/>
                <Row>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="category-name">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control
                                type="text"
                                value={category.name || ''}
                                onChange={(e)=>setCategory({...category, name: e.target.value})}
                                required
                                readOnly={mode=='remove'}
                                placeholder="Informe o nome da Categoria"
                            />
                        </Form.Group>
                    </Col>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="category-path">
                            <Form.Label>Catgegoria Pai:</Form.Label>
                            <Form.Select
                                value={category.parentId || ''}
                                onChange={(e)=>setCategory({...category, parentId: e.target.value})}
                                aria-label="Selecionar Categoria"
                                disabled={mode=='remove'}
                            >
                            <option value=''>Selecione...</option>
                            {categories.map((cat)=>(
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs='12'>
                    {mode == 'save' && (
                        <Button variant='success' onClick={save}>Salvar</Button>
                    )}
                    {mode == 'remove' &&(
                        <Button variant="danger" onClick={remove}>Excluir</Button>
                    )}
                    <Button className="ml-1" onClick={reset}>Cancelar</Button>
                    </Col>
                </Row>
            </Form>
            <hr/>
            <Table hover striped>
                <thead>
                    <tr>
                        {fields.map(field=>(
                            <th key={field.key}>{field.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ?(categories.map(category=>(
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.path}</td>
                            <td>
                            <Button
                                variant="warning"
                                onClick={() => loadCategory(category)}
                                className="mr-1"
                            >
                                <i className="fa fa-pencil" aria-hidden="true" />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => loadCategory(category, 'remove')}
                                className="mr-3"
                            >
                                <i className="fa fa-trash" aria-hidden="true" />
                            </Button>
                            </td>
                        </tr>
                    ))): (
                        <tr>
                            <td colSpan={fields.length}>Nenhum dado disponível</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default CategoriesAdmin