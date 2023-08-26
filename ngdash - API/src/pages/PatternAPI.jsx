import React,{ useState ,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {BsPersonBadge} from 'react-icons/bs';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Header,BasicMap } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import Plot from 'react-plotly.js';
import { bgcolor } from '@mui/system';

// import pandas as pd
// from dash import dcc
// import dash_bio as dashbio

const PatternAPI = () => {
    const navigate = useNavigate();
    const {currentColor,currentMode}=useStateContext();
    
    const [initialData, setInitialData] = useState({});
    const [cleanedData, setCleanedData] = useState({});
    const [preProcessedData, setPreProcessedData] = useState({});
    const [scaledData, setScaledData] = useState({});
    const [modeledData, setModeledData] = useState({});
    const [hierarchicalModeledData, setHierarchicalModelData] = useState({});
    const [silhouetteScores, setSilhouetteScores] = useState({});
    

    const[pageSize,setPageSize]= useState(5);
    const[pageSizeTable2,setPageSizeTable2]= useState(5);
    const[pageSizeTable3,setPageSizeTable3]= useState(5);
    const[pageSizeTable4,setPageSizeTable4]= useState(5);
    const[pageSizeTable5,setPageSizeTable5]= useState(10);
    const [plotData, setPlotData] = useState({});
    const [plotDataKeys, setWssPlotDataKeys] = useState({});
    const [plotDataValues, setWssPlotDataValues] = useState({});
    
    const [amountByClusterIdBoxPlotDataValues, setAmountByClusterIdBoxPlotDataValues] = useState({});
    const [frequencyByClusterIdBoxPlotDataValues, setFrequencyByClusterIdBoxPlotDataValues] = useState({});
    const [recencyByClusterIdBoxPlotDataValues, setRecencyByClusterIdBoxPlotDataValues] = useState({});
    const [hierarchicalAmountByClusterIdBoxPlotDataValues, setHierarchicalAmountByClusterIdBoxPlotDataValues] = useState({});
    const [hierarchicalFrequencyByClusterIdBoxPlotDataValues, setHierarchicalFrequencyByClusterIdBoxPlotDataValues] = useState({});
    const [hierarchicalRecencyByClusterIdBoxPlotDataValues, setHierarchicalRecencyByClusterIdBoxPlotDataValues] = useState({});
    
    const datagridPlaceHolder=
    <div role="status" className="space-y-4 animate-pulse max-w-full">
      <div className="flex items-center space-x-2 w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center space-x-2 w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      
      <span className="sr-only">Loading...</span>
    </div>;
  const plotPlaceHolder=
  <div role="status">
    <svg aria-hidden="true" className="w-16 h-16 mr-2 text-gray-200 animate-spin" viewBox="0 0 100 101" fill={currentColor} xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>;
    useEffect(()=>{
        
        axios.get('http://127.0.0.1:8000/classification/dataset/').then(async (response)=>{
    //   axios.get('https://dummyjson.com/users/').then((response)=>{
          
          console.log("respose");
          console.log(response.data);
          console.log(response.data.data);
          let initialDataResponse=response.data.data;
          setInitialData(initialDataResponse);

          console.log(initialDataResponse[0]);
          console.log(initialDataResponse[1]);
          console.log("length"+ initialDataResponse.length);
          console.log( "DataType "+typeof initialDataResponse);
          const initialDataJson = JSON.stringify(initialDataResponse);
          // console.log( "DataType "+typeof initialData);
          // console.log( "DataType "+typeof data);

          
          var customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
          await axios.post('http://127.0.0.1:8000/classification/data_cleaning/',initialDataJson)
        .then(async response =>{
          console.log("Response Data from Data Cleaning");
          console.log(response.data);
          console.log(response.data.response);
          let cleanedDataResponse=response.data.response;
          console.log("length"+ cleanedDataResponse.length);
          console.log( "DataType "+typeof cleanedDataResponse);
          setCleanedData(cleanedDataResponse)
          const cleanedDataJson = JSON.stringify(cleanedDataResponse);
          await axios.post('http://127.0.0.1:8000/classification/data_pre_processing/',cleanedDataJson)
        .then(async response =>{
          let preProcessedDataResponse=response.data.response;
          console.log(preProcessedDataResponse);
          setPreProcessedData(preProcessedDataResponse);
           const preProcessedDataResponseJson = JSON.stringify(response.data.response);
            await axios.post('http://127.0.0.1:8000/classification/data_scaling/',preProcessedDataResponseJson) .then(
            async response =>{
            let scaledDataResponse=response.data.response;
            console.log(scaledDataResponse);
            setScaledData(scaledDataResponse);
            const scaledDataResponseJson = JSON.stringify(scaledDataResponse);
              await axios.post('http://127.0.0.1:8000/classification/modeled_data/',scaledDataResponseJson) .then(
              async response =>{
                let modeledDataResponse=response.data.response;
                console.log(modeledDataResponse);
                setModeledData(modeledDataResponse);
                console.log("Modeled Data");
                const datasets=Object.values(modeledDataResponse)
                const clusters = Array.from(new Set(datasets.map((item) => item.Cluster_Id)));
                console.log(clusters);
                let datasetByClusterID=[];
                let amountBoxPlotData=[];
                let frequencyBoxPlotData=[];
                let recencyBoxPlotData=[];
                clusters.forEach((cluster_id,index)=>{
                   datasetByClusterID[index]=datasets.filter(data => data.Cluster_Id ===cluster_id);
                   amountBoxPlotData[index] = {
                    y: Object.values(datasetByClusterID[index]).map(item => item.Amount),
                    type: 'box',
                    name: "Cluster "+index,
                    
                  };
                  frequencyBoxPlotData[index] = {
                    y: Object.values(datasetByClusterID[index]).map(item => item.Frequency),
                    type: 'box',
                    name: "Cluster "+index
                  };
                  recencyBoxPlotData[index] = {
                    y: Object.values(datasetByClusterID[index]).map(item => item.Recency),
                    type: 'box',
                    name: "Cluster "+index 
                  };
                  
                  
                  console.log(Object.values(datasetByClusterID[index]).map(item => item.Amount));
                });

                setAmountByClusterIdBoxPlotDataValues(amountBoxPlotData);
                setFrequencyByClusterIdBoxPlotDataValues(frequencyBoxPlotData);
                setRecencyByClusterIdBoxPlotDataValues(recencyBoxPlotData);
                   

                

                await axios.post('http://127.0.0.1:8000/classification/wss_plot/',scaledDataResponseJson) .then(
                    async response=>{
                      let wssPlotDataResponse=response.data.response;
                      var wss_json_array = JSON.parse(wssPlotDataResponse);
                      console.log("WSS");
                      console.log(wss_json_array);
                      
                      
                      var dataKeys=Array.from(wss_json_array.keys());
                      var dataValues=Array.from(wss_json_array.values());
                      setWssPlotDataKeys(dataKeys);
                      setWssPlotDataValues(dataValues);
                      // setWss(wss_json_array);
                      await axios.post('http://127.0.0.1:8000/classification/silhouette_scores/',scaledDataResponseJson) .then(
                        async response =>{
                          
                          let silhouetteScoresDataResponse=response.data.response;
                          console.log( "DataType "+typeof silhouetteScoresDataResponse);
                          var silhouetteScoresDataResponseArray = JSON.parse(silhouetteScoresDataResponse);
                          console.log(silhouetteScoresDataResponseArray);
                          setSilhouetteScores(silhouetteScoresDataResponseArray);
                          await axios.post('http://127.0.0.1:8000/classification/modeled_data_hierarchical/',scaledDataResponseJson, customConfig) .then(
                            async response =>{
                              let hierarchicalModeledDataResponse=response.data.response;
                              console.log(hierarchicalModeledDataResponse);
                              setHierarchicalModelData(hierarchicalModeledDataResponse);
                              console.log("Modeled Data");
                              const hierarchicalDatasets=Object.values(hierarchicalModeledDataResponse)
                              const hierarchicalClusters = Array.from(new Set(hierarchicalDatasets.map((item) => item.Cluster_Id)));
                              console.log(hierarchicalClusters);
                              let hierarchicalDatasetByClusterID=[];
                              let hierarchicalAmountBoxPlotData=[];
                              let hierarchicalFrequencyBoxPlotData=[];
                              let hierarchicalRecencyBoxPlotData=[];
                              hierarchicalClusters.forEach((cluster_id,index)=>{
                                 hierarchicalDatasetByClusterID[index]=hierarchicalDatasets.filter(data => data.Cluster_Id ===cluster_id);
                                 hierarchicalAmountBoxPlotData[index] = {
                                  y: Object.values(hierarchicalDatasetByClusterID[index]).map(item => item.Amount),
                                  type: 'box',
                                  name: "Cluster "+index,
                                  
                                };
                                hierarchicalFrequencyBoxPlotData[index] = {
                                  y: Object.values(hierarchicalDatasetByClusterID[index]).map(item => item.Frequency),
                                  type: 'box',
                                  name: "Cluster "+index
                                };
                                hierarchicalRecencyBoxPlotData[index] = {
                                  y: Object.values(hierarchicalDatasetByClusterID[index]).map(item => item.Recency),
                                  type: 'box',
                                  name: "Cluster "+index 
                                };
                                
                                
                                console.log(Object.values(hierarchicalDatasetByClusterID[index]).map(item => item.Amount));
                              });
              
                              setHierarchicalAmountByClusterIdBoxPlotDataValues(hierarchicalAmountBoxPlotData);
                              setHierarchicalFrequencyByClusterIdBoxPlotDataValues(hierarchicalFrequencyBoxPlotData);
                              setHierarchicalRecencyByClusterIdBoxPlotDataValues(hierarchicalRecencyBoxPlotData);
                              
                            }
                          );
                          
                        });
                      
                      });
                
              
            
            }
              )   
            
           
            
          });
            

        });
          
        } );
      });

    },[]);
    

    const sx={
      className:'dark:text-gray-200 dark:bg-secondary-dark-bg',
      boxShadow: 4,
      border: 0,
      borderColor: 'lightgray',
      '& .MuiDataGrid-cell:hover': {
        color: 'darkcyan',
      },'& .MuiDataGrid-cell:active': {
        accentColor: 'darkcyan',
      },
      }

    const initialState={
        sorting: {
          sortModel: [{ field: 'name', sort: 'desc' }],
        },
    }

  let initial_cleaned_data_columns=[
    
  { field: 'id',cellClassName: 'super-app-theme--cell' ,headerName: "Invoice No",flex:1,align: 'center', hide: true, headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',},
  { field: 'invoice_no' ,headerName: "Invoice No.",flex:1,minWidth:110,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'customer_id' ,headerName: "Customer ID",flex:1,minWidth:120,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'gender' ,headerName: "Gender",flex:1,minWidth:50,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'age' ,headerName: "Age",flex:1,minWidth:70,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 

  { field: 'category' ,headerName: "Category",flex:1,minWidth:90,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
    
  </div> 
  }, 
  { field: 'quantity' ,headerName: "Quantity",flex:1,minWidth:50,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
    
  </div> 
  }, { field: 'price' ,headerName: "Price",flex:1,minWidth:150,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
    
  </div> 
  }, 
  { field: 'payment_method' ,headerName: "Payment Method",flex:1,minWidth:150,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
    
  </div> 
  }, 
  { field: 'invoice_date' ,headerName: "Invoice Date",flex:1,minWidth:150,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
    
  </div> 
  }, 
  
];

let pre_processed_data_columns=[
    

  { field: 'CustomerID' ,headerName: "Customer ID",flex:1,minWidth:120,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'Amount' ,headerName: "Amount",flex:1,minWidth:50,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'Frequency' ,headerName: "Frequency",flex:1,minWidth:70,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 

  { field: 'Recency' ,headerName: "Recency",flex:1,minWidth:90,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
    
  </div> 
  }
  
];
let scaled_data_columns=[
  
  { field: 'Amount' ,headerName: "Amount",flex:1,minWidth:50,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'Frequency' ,headerName: "Frequency",flex:1,minWidth:70,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 

  { field: 'Recency' ,headerName: "Recency",flex:1,minWidth:90,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
    
  </div> 
  }
  
]; 

let modeled_data_column=[
 
  { field: 'Amount' ,headerName: "Amount",flex:1,minWidth:50,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'Frequency' ,headerName: "Frequency",flex:1,minWidth:70,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 

  { field: 'Recency' ,headerName: "Recency",flex:1,minWidth:90,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
    
  </div> 
  }, 

  { field: 'Cluster_Id' ,headerName: "Cluster ID",flex:1,minWidth:90,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
    
  </div> 
  }
  
]; 
let sillhouette_scores_data_columns=[
  
  { field: 'no_of_clusters' ,headerName: "No. Of Clusters",flex:1,minWidth:50,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'silhouette_avg' ,headerName: "Silhouette Avg",flex:1,minWidth:70,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }
];   
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl text-black dark:text-gray-200 dark:bg-secondary-dark-bg border-white">
      <Header category="Page" title="Classification Algorithm Comparison"/>
      <h3 className='font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8'>Initial Data</h3>
      <div style={{ height: 380}} className="mt-8 min-w-fit px-4">
            {initialData.length > 0 ? 
            <DataGrid
                
                sx={sx}
                initialState={initialState}
                columns={initial_cleaned_data_columns}
                rows={initialData}
                getRowId={(row) => row.invoice_no}
                rowsPerPageOptions={[5,10,20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          /> : 
            <div role="status" className="space-y-4 animate-pulse max-w-full">
                <div className="flex items-center space-x-2 w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center space-x-2 w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                
                <span className="sr-only">Loading...</span>
                
                
            </div>
        }
      </div>
      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Cleaned Data</h3>
      <div style={{ height: 380}} className="mt-8 min-w-fit px-4">
            {cleanedData.length > 0 ? 
            <DataGrid
                
                sx={sx}
                initialState={initialState}
                columns={initial_cleaned_data_columns}
                rows={cleanedData}
                getRowId={(row) => row.invoice_no}
                rowsPerPageOptions={[5,10,20]}
                pageSize={pageSizeTable2}
                onPageSizeChange={(newPageSize) => setPageSizeTable2(newPageSize)}
          /> : 
          datagridPlaceHolder
        }
      </div>
      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Pre-Processed Data</h3>
      <div style={{ height: 380}} className="mt-8 min-w-fit px-4">
            {preProcessedData.length > 0 ? 
            <DataGrid
                
                sx={sx}
                initialState={initialState}
                columns={pre_processed_data_columns}
                rows={preProcessedData}
                getRowId={(row) => row.CustomerID
 }
                rowsPerPageOptions={[5,10,20]}
                pageSize={pageSizeTable3}
                onPageSizeChange={(newPageSize) => setPageSizeTable3(newPageSize)}
          /> : 
         datagridPlaceHolder
        }
      </div>

      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Scaled Data</h3>
      <div style={{ height: 380}} className="mt-8 min-w-fit px-4">
            {scaledData.length > 0 ? 
            <DataGrid
                
                sx={sx}
                initialState={initialState}
                columns={scaled_data_columns}
                rows={scaledData}
                getRowId={(row) => row.Amount+row.Recency
 }
                rowsPerPageOptions={[5,10,20]}
                pageSize={pageSizeTable4}
                onPageSizeChange={(newPageSize) => setPageSizeTable4(newPageSize)}
          /> : 
            <div role="status" className="space-y-4 animate-pulse max-w-full">
                <div className="flex items-center space-x-2 w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center space-x-2 w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                
                <span className="sr-only">Loading...</span>
                
                
            </div>
        }
      </div>

      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Modeled Data</h3>
      <div style={{ height: 380}} className="mt-8 min-w-fit px-4">
            {modeledData.length > 0 ? 
            <DataGrid
                
                sx={sx}
                initialState={initialState}
                columns={modeled_data_column}
                rows={modeledData}
                getRowId={(row) => row.Amount+row.Recency}
                rowsPerPageOptions={[5,10,20]}
                pageSize={pageSizeTable4}
                onPageSizeChange={(newPageSize) => setPageSizeTable4(newPageSize)}
          /> : 
          datagridPlaceHolder
        }
      </div>
       
      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Within-Cluster Sum of Squares (WSS)</h3>
      <div className='px-4 mt-8 bg-white rounded-xl text-black dark:text-gray-200 dark:bg-secondary-dark-bg border-white'> 
      
      <div>
      { plotDataKeys.length>0?<Plot
          
          data={[
            {
              x: Array.from(plotDataKeys),
              y: Array.from(plotDataValues),
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: currentColor},
            },
            
          ]}
          // layout={ { title: 'WSS Plot',plot_bgcolor:"rgb(121, 136, 125)", paper_bgcolor:currentMode?"rgb(121, 136, 125)"} }
          layout={ {autosize:true,font:{color: currentMode==='Light'?"#71797E":"rgba(224, 224, 224, 1)"}, title: 'WSS Plot',plot_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E", paper_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E",legend:{font:{color:"#0e72b1"}}} }
        />:
        plotPlaceHolder
        }
      </div>
        
      </div>
      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Silhouette Scores</h3>
      <div style={{ height: 430}} className="mt-8 min-w-fit px-4">
            {silhouetteScores.length > 0 ? 
            <DataGrid
                
                sx={sx}
                initialState={initialState}
                columns={sillhouette_scores_data_columns}
                rows={silhouetteScores}
                getRowId={(row) => row.no_of_clusters
 }
                rowsPerPageOptions={[10,20]}
                pageSize={pageSizeTable5}
                onPageSizeChange={(newPageSize) => setPageSizeTable5(newPageSize)}
          /> : 
          datagridPlaceHolder
        }
        </div>
        <h2 className="font-bold tracking-tight text-slate-600 dark:text-gray-100 px-4 mt-8 text-xl">KMS</h2>
      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Amount by Clusters Plot</h3>
      <div className='px-4 mt-8 bg-white rounded-xl text-black dark:text-gray-200 dark:bg-secondary-dark-bg border-white'> 
        { amountByClusterIdBoxPlotDataValues.length>0?<Plot
          
          data={amountByClusterIdBoxPlotDataValues}
          layout={ {autosize:true,font:{color: currentMode==='Light'?"#71797E":"rgba(224, 224, 224, 1)"}, title: 'Amount by Clusters Boxplot',plot_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E", paper_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E"} }
        />:
        plotPlaceHolder
        
        }
      </div>
      
      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8 ">Frequency by Clusters Plot</h3>
      <div className='px-4 mt-8 bg-white rounded-xl text-black dark:text-gray-200 dark:bg-secondary-dark-bg border-white'> 
        { frequencyByClusterIdBoxPlotDataValues.length>0?<Plot
          
          data={frequencyByClusterIdBoxPlotDataValues}
          layout={ {autosize:true,font:{color: currentMode==='Light'?"#71797E":"rgba(224, 224, 224, 1)"}, title: 'Frequency by Clusters Boxplot',plot_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E", paper_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E"} }
        />:
        plotPlaceHolder
        
        }
      </div>


      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Recency by Clusters Plot</h3>
      <div className='px-4 mt-8 bg-white rounded-xl text-black dark:text-gray-200 dark:bg-secondary-dark-bg border-white'> 
        { recencyByClusterIdBoxPlotDataValues.length>0?<Plot
          
          data={recencyByClusterIdBoxPlotDataValues}
          layout={ { autosize:true,font:{color: currentMode==='Light'?"#71797E":"rgba(224, 224, 224, 1)"},title: 'Recency by Clusters Boxplot',plot_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E", paper_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E"} }
        />:
        plotPlaceHolder
        
        }
      </div>
      <h2 className="font-bold tracking-tight text-slate-600 dark:text-gray-100 px-4 mt-8 text-xl">Hierarchical</h2>
      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Amount by Clusters Plot</h3>
      <div className='px-4 mt-8 bg-white rounded-xl text-black dark:text-gray-200 dark:bg-secondary-dark-bg border-white'> 
        { hierarchicalAmountByClusterIdBoxPlotDataValues.length>0?<Plot
          
          data={hierarchicalAmountByClusterIdBoxPlotDataValues}
          layout={ {autosize:true,font:{color: currentMode==='Light'?"#71797E":"rgba(224, 224, 224, 1)"}, title: 'Amount by Clusters Boxplot',plot_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E", paper_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E"} }
        />:
        plotPlaceHolder
        
        }
      </div>

      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Frequency by Clusters Plot</h3>
      <div className='px-4 mt-8 bg-white rounded-xl text-black dark:text-gray-200 dark:bg-secondary-dark-bg border-white'> 
        { hierarchicalFrequencyByClusterIdBoxPlotDataValues.length>0?<Plot
          
          data={hierarchicalFrequencyByClusterIdBoxPlotDataValues}
          layout={ {autosize:true,font:{color: currentMode==='Light'?"#71797E":"rgba(224, 224, 224, 1)"}, title: 'Frequency by Clusters Boxplot',plot_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E", paper_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E"} }
        />:
        plotPlaceHolder
        
        }
      </div>


      <h3 className="font-bold tracking-tight text-slate-900 dark:text-gray-100 px-4 mt-8">Recency by Clusters Plot</h3>
      <div className='px-4 mt-8 bg-white rounded-xl text-black dark:text-gray-200 dark:bg-secondary-dark-bg border-white'> 
        { hierarchicalRecencyByClusterIdBoxPlotDataValues.length>0?<Plot
          
          data={hierarchicalRecencyByClusterIdBoxPlotDataValues}
          layout={ { autosize:true,font:{color: currentMode==='Light'?"#71797E":"rgba(224, 224, 224, 1)"},title: 'Recency by Clusters Boxplot',plot_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E", paper_bgcolor:currentMode==='Light'?"rgba(224, 224, 224, 1)":"#71797E"} }
        />:
        plotPlaceHolder
        
        }
      </div>
      <div className='px-4 mt-8 tracking-tight text-slate-900 dark:text-gray-100'>
        <h3 className="font-bold mt-6">Inference</h3>
        <h4 className="font-semi-bold mt-2">K-Means Clustering with 3 Cluster IDs</h4>
        
        <ul className="mt-2 list-[upper-roman] list-inside indent-8">
          <li>Customers with Cluster Id 0 are the customers with high amount of transactions as compared to other customers.</li>
          <li>Customers with Cluster Id 1 and 2 are almost with same amount of transactions but customers with Cluster Id 1 are the most recent buyer.</li>
          <li>Customers with Cluster Id 2 are not recent buyers and hence least of importance from business point of view.</li>
        </ul>


        <h3 className="font-bold mt-6">Inference</h3>
        <h4 className="font-semi-bold mt-2">Hierarchical Clustering with 5 Cluster IDs</h4>
        
        <ul className="mt-2 list-[upper-roman] list-inside indent-8">
          <li>Customers with Cluster Id 0 are the customers with high amount of transactions as compared to other customers.</li>
          <li>Customers with Cluster Id 1 and 2 are almost with same amount of transactions but customers with Cluster Id 1 are the most recent buyer.</li>
          <li>Customers with Cluster Id 2 are not recent buyers and hence least of importance from business point of view.</li>
        </ul>
      </div>
      
      

    </div>
    
  )
}

export default PatternAPI