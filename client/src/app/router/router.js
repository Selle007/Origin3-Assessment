// Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../../features/pages/Homepage';
import { NewsDetails } from '../../features/pages/News';

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/details/:id" element={<NewsDetails />} />
            </Routes>
        </>
    );
}

export default AppRouter;
