import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Faqs() {
  return <>

  <h1 style={{fontSize : "30px"}} className=' p-4 font-bold text-center'>FAQS</h1>
  
  <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-2'>

       

      <Accordion sx={{
        backgroundColor : "#f5f6f7"
      }}>

        <AccordionSummary sx={{
          boxShadow : "none" ,
          "&:focus" : {
            outline : "none" ,
            // backgroundColor : "#f5f6f7"
          }
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span" sx={{
             fontWeight : "bold"
          }}>What is this app used for?</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography sx={{
             borderTop : "1px solid black",
             paddingTop : "15px",
             color : "#2c2f33"
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>

      </Accordion>

  </div>

  
  
  </>
}
