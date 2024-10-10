import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    CTable,
    CTableRow,
    CTableHead,
    CTableHeaderCell,
    CTableDataCell,
    CTableBody,
    CCard,
    CCardBody,
    CButton,
    CSpinner,
    CAlert
} from '@coreui/react';

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://fridggie-backend-render-express.onrender.com/users');
                setUsers(response.data);
            } catch (error) {
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };
    
        fetchUsers();
    }, []);
    

    if (loading) {
        return <CSpinner color="primary" />;
    }

    if (error) {
        return <CAlert color="danger">{error}</CAlert>;
    }

    return (
        <>
            <CCard className="mb-4">
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <CTableRow key={user._id}>
                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                        <CTableDataCell>{user.username}</CTableDataCell>
                                        <CTableDataCell>{user.email}</CTableDataCell>
                                        <CTableDataCell>{user.role}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton color="warning">Edit</CButton>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CButton color="danger">Delete</CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))
                            ) : (
                                <CTableRow>
                                    <CTableDataCell colSpan="6" className="text-center">
                                        No users available
                                    </CTableDataCell>
                                </CTableRow>
                            )}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </>
    );
};

export default User;
