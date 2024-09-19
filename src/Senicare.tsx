import React, { useEffect } from 'react';
import './Senicare.css';
import Auth from 'src/views/Auth'; // 폴더 아래 index.tsx 있을 경우 그 자체로 인식해서 폴더로 가져올 수 있음
import { Routes, Route, useNavigate } from 'react-router';
import MainLayout from './layouts/MainLayout';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, AUTH_PATH, CS_ABSOLUTE_PATH, CS_DETAIL_PATH, CS_PATH, CS_UPDATE_PATH, CS_WRITE_PATH, HR_DETAIL_PATH, HR_PATH, MM_PATH, OTHERS_PATH, ROOT_PATH, SNS_SUCCESS_PATH } from './constants';
import CS from './views/CS';
import CSWrite from './views/CS/Write';
import CSDetail from './views/CS/Detail';
import CSUpdate from './views/CS/Update';
import MM from './views/MM';
import HR from './views/HR';
import HRDetail from './views/HR/Detail';
import { useSearchParams } from 'react-router-dom';

// component: root path 컴포넌트 // 
function Index() {

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 마운트 시 경로 이동 //
  useEffect(() => {
    if (cookies[ACCESS_TOKEN]) navigator(CS_ABSOLUTE_PATH);
    else navigator(AUTH_ABSOLUTE_PATH);
  }, []);
  
  // render: root path 컴포넌트 렌더링 //
  return (
    <></>
  )
};

// component: Sns Success 컴포넌트 //
function SnsSuccess() {

  // state: Query Parameter 상태 //
  const [queryParam] = useSearchParams();
  const accessToken = queryParam.get('accessToken');
  const expiration = queryParam.get('expiration');

  // state: cookie 상태 //
  const [cookies, setCookie] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: Sns Success 컴포넌트 로드 시 accessToken과 expiration을 확인하여 로그인 처리 함수 //
  useEffect(() => {
    if (accessToken && expiration) { // 문자열로 받아오기 때문에 숫자형태로 변경
      const expires = new Date(Date.now() + (Number(expiration) * 1000));
      setCookie(ACCESS_TOKEN, accessToken, { path:ROOT_PATH, expires });

      navigator(CS_ABSOLUTE_PATH);
    }
    else navigator(AUTH_ABSOLUTE_PATH);
  }, []);

  // render: Sns Success 컴포넌트 렌더링 //
  return <></>;

}

// component: Senicare 컴포넌트 //
export default function Senicare() {

  // render: Senicare 컴포넌트 렌더링 //
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={AUTH_PATH} element={<Auth />} />
      <Route path={CS_PATH} element={<MainLayout />}>
        <Route index element={<CS />} />
        <Route path={CS_WRITE_PATH} element={<CSWrite />} />
        <Route path={CS_DETAIL_PATH(':customNumber')} element={<CSDetail />} />
        <Route path={CS_UPDATE_PATH(':customNumber')} element={<CSUpdate />} />
      </Route>
      <Route path={MM_PATH} element={<MainLayout />}>
        <Route index element={<MM />} />
      </Route>
      <Route path={HR_PATH} element={<MainLayout />}>
        <Route index element={<HR />} />
        <Route path={HR_DETAIL_PATH(':userId')} element={<HRDetail />} />
      </Route>
      <Route path={SNS_SUCCESS_PATH} element={<SnsSuccess/>} />
      <Route path={OTHERS_PATH} element={<Index />} />
    </Routes>
  );
}
