import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import {FiSettings } from 'react-icons/fi';
import {Navbar,Footer,Sidebar,ThemeSettings} from './components';
import {DashHome,Products,Employees,Customers,AddProduct, EditProduct,AddEmployee,EditEmployee,Calendar,Stacked,Pyramid,Kanban,CustomArea,CustomBar,Pie,CustomLineChart,Financial,ColorPicker,ColorMapping,Editor, CustomSeriesLinePage,EmployeeProfile,CustomerProfile,EmployeesAPITest, PatternAPI} from './pages';
import {useStateContext} from './contexts/ContextProvider';


const App=()=>{

  const {activeMenu,themeSettings,setThemeSettings,currentColor,currentMode} = useStateContext();
  // const {users,setUsers,currentUser,setCurrentUser,showPopUp,setShowPopUp,selectedAddress,setSelectedAddress} = useMapContext();
  return(
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-2 bottom-8" style={{ zIndex: '1000' }}>
            
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full shadow-xl">
              <Navbar />
            </div>
            <div>
          {themeSettings && <ThemeSettings/>}
          <Routes>
                {/*Dashboard*/}
              <Route path="/" element={<DashHome/>}/>
              <Route path="/home" element={<DashHome/>}/>


              {/*Pages*/}
              {/* <Route path="/orders" element={<Orders/>}/> */}
              
              {/* <Route path="/employees" element={<Employees/>}/> */}
              
              
              {/* <Route path="/employees_grid_data" element={<EmployeesCopy/>}/> */}
              {/* <Route path="/customers_grid_data" element={<CustomersCopy/>}/> */}
              

              {/*Custom Pages*/}
              <Route path="/addproduct" element={<AddProduct/>}/>
              <Route path="/editproduct" element={<EditProduct/>}/>
              <Route path="/addemployee" element={<AddEmployee/>}/>
              <Route path="/editemployee" element={<EditEmployee/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/profile" element={<EmployeeProfile/>}/>

              {/*Apps*/}
              <Route path="/kanban" element={<Kanban/>}/>
              {/* <Route path="/editor" element={<Editor/>}/> */}
              <Route path="/calendar" element={<Calendar/>}/>
              {/* <Route path="/color-picker" element={<ColorPicker/>}/> */}
              

              {/*Charts*/}
              <Route path="/line" element={<CustomLineChart/>}/>
              <Route path="/customseriesline" element={<CustomSeriesLinePage/>}/>
              <Route path="/area" element={<CustomArea/>}/>
              <Route path="/bar" element={<CustomBar/>}/>
              <Route path="/pie" element={<Pie/>}/>
              <Route path="/financial" element={<Financial/>}/>
              <Route path="/color-mapping" element={<ColorMapping/>}/>
              <Route path="/pyramid" element={<Pyramid/>}/>
              <Route path="/stacked" element={<Stacked/>}/>
              <Route path="/employees">
                <Route index element={<Employees/>}></Route>
                <Route path="employee/:id" element={<EmployeeProfile/>}></Route>
                
              </Route>  
              <Route path="/employeesAPITest">
                <Route index element={<EmployeesAPITest/>}></Route>
                <Route path="employeesAPITest/:id" element={<EmployeeProfile/>}></Route>
              </Route>
              
                <Route path="/patternAPI" element={<PatternAPI/>}/>
              
              <Route path="/customers">
                <Route index element={<Customers/>}></Route>
                <Route path="customer/:id" element={<CustomerProfile/>}></Route>
                
              </Route>  
          </Routes>
        </div>
        </div>
      </div>
    </BrowserRouter>
</div>
  )
}
export default App;
