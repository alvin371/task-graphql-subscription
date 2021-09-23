import "./Home.css"
const ListItem = (props) => {
    const { id, nama, umur, jenis_kelamin } = props.data
    const { hapusAnggota, editAnggota } = props;

    return (
        <tr>
            <td>{nama}</td>
            <td>{umur}</td>
            <td>{jenis_kelamin}</td>
            <td className="removeBorder" onClick={editAnggota}>
                <button>Edit</button>
            </td>
            <td className="removeBorder" onClick={hapusAnggota}>
                <button>Hapus</button>
            </td>
        </tr>
    )
}

export default ListItem;