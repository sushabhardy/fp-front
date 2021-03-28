import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

export default {
  component: <></>,
  title: 'Common/Snackbar',
};

const Template = args => {
    return(
        <SnackbarProvider>
            <Button args={args}/>
        </SnackbarProvider>
    )
};

const Button = (args) =>{
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return(
        <button onClick={()=>{
            enqueueSnackbar(
                args.args.title, 
                {
                    persist:true, 
                    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                    disableWindowBlurListener: true
                }
            );
        }}>
            Show snackbar
        </button>
    )
}

export const Default = Template.bind({});
Default.args = {
    title: "This is the title",
    subtitle: "This is the subtitle"
};
