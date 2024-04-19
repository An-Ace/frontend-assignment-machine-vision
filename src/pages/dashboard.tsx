import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@/components/Table/Index";
import { GetListBeiProduct } from "@/service/example/bei_product.service";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Icon } from '@iconify/react'
import client from "@/client";
import { GridPreProcessEditCellProps } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function Home() {
    const [deleteDialog, setDeleteDialog] = React.useState(0)
    const router = useRouter();
    React.useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        !accessToken && router.push('/')
    }, [])
    return (
        <Box
            sx={{
                my: 4,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h4" component="h1" sx={{mb: 2}}>
                <Table
                  limit={3}
                  dataFetchService={GetListBeiProduct}
                  title="Data Perusahaan BEI (Double Click Cell To Edit)"
                  columns={[
                    { 
                        field: 'kode_saham', headerName: 'Kode Saham', searchable: true, editable: true,
                        preProcessEditCellProps: (e) => editField(e, 'kode_saham')
                    },
                    { 
                        field: 'nama', width: 300, headerName: 'Nama', searchable: true, editable: true,
                        preProcessEditCellProps: (e) => editField(e, 'kode_saham')
                    },
                    { field: 'sektor_id', width: 300, headerName: 'Sektor ID' },
                    {
                        field: 'tanggal_listing', headerName: 'Tanggal Listening', editable: true,
                        renderCell: (e) => (
                            <>
                                { format(e.value, 'dd/MM/yyyy') }
                            </>
                        )
                    },
                    {
                        field: 'actions',
                        headerName: 'ACTIONS',
                        editable: false,
                        renderCell: (e) => (
                            <>
                                <Button variant='text' color='error' size='small' onClick={() => setDeleteDialog(e.row.id)}>
                                    <Icon icon='uil:trash-alt'/>
                                </Button>
                            </>
                        )
                    }
                  ]}
                />
                <Dialog
                    open={Boolean(deleteDialog)}
                    onClose={() => setDeleteDialog(0)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Hapus Data?"}
                    </DialogTitle>
                    <DialogActions>
                    <Button onClick={() => setDeleteDialog(0)}>Cencel</Button>
                    <Button onClick={() => deleteField(deleteDialog)} autoFocus>
                        Confirm Delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </Typography>
        </Box>
    );
}

async function editField (e: GridPreProcessEditCellProps<any, any>, field: string) {
    if (e.hasChanged) {
        const update = await client.api.patch(`/items/perusahaan_bei/${e.id}`, { [field]: e.props.value })
        console.log(update)
    }
    return {}
}

async function deleteField (id: number) {
    const del = await client.api.delete(`/items/perusahaan_bei/${id}`)
    console.log(del)
    return {}
}