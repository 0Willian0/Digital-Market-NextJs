'use client'
import React, { useEffect, useState } from 'react';
import { Tree, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'antd/dist/reset.css'; // Importando os estilos do Ant Design
import { baseApiUrl } from '../../app/config/global';
import '../../styles/Menu.css'
import { useSelector } from 'react-redux';

// Definindo a interface para os dados da árvore
interface TreeNode {
    key: number | string; // Usamos o ID como chave
    title: string;        // Usamos o nome como título
    children?: TreeNode[]; // Filhos do nó
}

const Menu: React.FC = () => {
    const router = useRouter();
  
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [filteredTreeData, setFilteredTreeData] = useState<TreeNode[]>([]);
    const [treeFilter, setTreeFilter] = useState<string>('');
    const isMenuVisible = useSelector((state: { isMenuVisible: boolean }) => state.isMenuVisible); // Obtendo o estado de visibilidade do menu

    // Fetch da árvore de categorias
    useEffect(() => {
        const fetchTreeData = async () => {
        try {
            const url = `${baseApiUrl}/categories/tree`; // Ajuste a URL para o seu backend
            const { data } = await axios.get(url);

            const formatTreeData = (nodes: any[]): TreeNode[] => {
                return nodes.map(node => ({
                  key: node.id,                        // Mapeia o id para key
                  title: node.name,                    // Mapeia o name para title
                  children: node.children ? formatTreeData(node.children) : [], // Recursivamente formata os filhos
                }));
              };

            const formattedData = formatTreeData(data);
            setTreeData(formattedData);
            setFilteredTreeData(formattedData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
        };

        fetchTreeData();
    }, []);

    // Seleção de um nó
    const onNodeSelect = (selectedKeys: React.Key[], info: any) => {
        const { node } = info;
        if (node && node.key) {
            router.push(`/product/${node.key}`);
        } else {
        console.error('ID do nó não encontrado:', node);
        }
    };

    // Filtragem da árvore
    const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTreeFilter(value);
        filterTreeData(value);
    };

    const filterTreeData = (filter: string) => {
        const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
        return nodes
            .map(node => {
            const children = filterNodes(node.children || []);
            return {
                ...node,
                children,
            };
            })
            .filter(node => 
            node.title.toLowerCase().includes(filter.toLowerCase()) || node.children.length > 0
            );
        };

        if (!filter) {
        setFilteredTreeData(treeData);
        } else {
        setFilteredTreeData(filterNodes(treeData));
        }
    };

    return (
        <>
        {!isMenuVisible && (
            <aside className="menu">
            <div className="menu-filter">
                <SearchOutlined />
                <Input
                type="text"
                placeholder="Digite para filtrar..."
                value={treeFilter}
                onChange={onFilterChange}
                className="filter-field"
                />
            </div>
            <Tree
                treeData={filteredTreeData}
                defaultExpandAll
                onSelect={onNodeSelect}
            />
            </aside>
        )}
        </>
    );
    };

export default Menu;
