import ListItem from './ListItem';
import { useState } from 'react';
import {
    useQuery,
    useMutation,
    gql
} from "@apollo/client";
import PassengerInput from './PassengerInput';

const query = gql`
  query MyQuery {
    kampus_merdeka_anggota {
      id
      jenis_kelamin
      nama
      umur
    }
  }
  
`;

const updateAnggota = gql`
    mutation MyMutation($id: Int!, $nama: String!) {
        update_kampus_merdeka_anggota_by_pk(pk_columns: { id: $id }, _set: { nama: $nama }) {
        id
        }
    }
  `;
const deleteAnggota = gql`
    mutation MyMutation($id: Int!) {
        delete_kampus_merdeka_anggota_by_pk(id: $id) {
        id
        }
    }
`;

const insertAnggota = gql`
    mutation MyMutation($object: kampus_merdeka_anggota_insert_input = {}) {
        insert_kampus_merdeka_anggota_one(object: $object) {
        id
        }
    }
`;


const ListPassenger = props => {
    const [userId, setUserId] = useState(0);
    const [editing, setEditing] = useState(true);
    const [nama, setNama] = useState("");
    const [umur, setUmur] = useState("");
    const [jenis_kelamin, setJenisKelamin] = useState("");
    const { loading, error, data } = useQuery(query);
    const [UpdateAnggota, { loading: loadingUpdate }] = useMutation(updateAnggota, {
        refetchQueries: [query],
    })
    const [InsertAnggota, { loading: loadingInsert }] = useMutation(insertAnggota, {
        refetchQueries: [query],
    })
    const [DeleteAnggota, { loading: loadingDelete }] = useMutation(deleteAnggota, {
        refetchQueries: [query],
    })
    const onChangeNama = (e) => {
        if (e.target) {
            setNama(e.target.value);
        }
    };
    const onChangeUmur = (e) => {
        if (e.target) {
            setUmur(e.target.value);
        }
    };
    const onChangeGender = (e) => {
        if (e.target) {
            setJenisKelamin(e.target.value);
        }
    };

    const onChangeUserId = (e) => {
        if (e.target) {
            setUserId(e.target.value);
        }
    };
    const editAnggota = async (idx) => {
        const item = data?.kampus_merdeka_anggota.find((v) => v.id === idx);
        const gantinama = prompt("masukan nama", item.nama);
        if (gantinama) {
            UpdateAnggota({
                variables: {
                    id: idx,
                    nama: gantinama,
                },
            });

            setTimeout(() => {
                alert("nama berhasil diubah");
            }, 3000);
        }
    };

    const tambahPengunjung = (e) => {
        InsertAnggota({
            variables: {
                object: {
                    nama: nama,
                    umur: umur,
                    jenis_kelamin: jenis_kelamin,
                },
            },
        });
    };

    const handleSubmit = (e) => {
        console.log(nama)
        console.log(umur)
        console.log(jenis_kelamin)
        if (nama.trim() && umur && jenis_kelamin) {
            if (umur >= 75 || umur <= 12) {
                alert("Umur tidak sesuai");
            } else {
                const newData = {
                    nama: nama,
                    umur: umur,
                    jenisKelamin: jenis_kelamin,
                    id: userId,
                };
                tambahPengunjung(newData);

                setNama("");
                setUmur("");
                setJenisKelamin("");
                setTimeout(() => {
                    alert("data berhasil diinput");
                }, 3000);
            }
        } else {
            alert("Data masih ada yang kosong");
        }
    };

    const handleBukaInput = () => {
        setEditing(false);
    };
    const handleTutupInput = () => {
        setEditing(true);
    };
    let viewMode = {};
    let editMode = {};

    if (editing) {
        viewMode.display = "none";
    } else {
        editMode.display = "none";
    }
    const hapusAnggota = (idx) => {
        console.log(idx)
        DeleteAnggota({
            variables: {
                id: idx,
            },
        });
        setTimeout(() => {
            alert("data berhasil dihapus");
        }, 1500);
    };
    if (loading || loadingUpdate || loadingInsert || loadingDelete) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <table cellPadding="5px" cellSpacing="0" style={{ margin: "auto" }}>
                <thead bgcolor="red">
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {data.kampus_merdeka_anggota.map(item => (
                    <ListItem
                        key={item.id}
                        data={item}
                        editAnggota={() => editAnggota(item.id)}
                        hapusAnggota={() => hapusAnggota(item.id)}
                    />
                ))}
            </table>
            <PassengerInput
                onChangeNama={onChangeNama}
                onChangeUmur={onChangeUmur}
                onChangeGender={onChangeGender}
                handleBukaInput={handleBukaInput}
                handleSubmit={handleSubmit}
                handleTutupInput={handleTutupInput}
                tambahPengunjung={tambahPengunjung}
                nama={nama}
                umur={umur}
                jenis_kelamin={jenis_kelamin}
                viewMode={viewMode}
                editMode={editMode}
            />
        </div>
    )
}

export default ListPassenger;