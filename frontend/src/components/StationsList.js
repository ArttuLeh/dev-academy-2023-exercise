const StationList = ({ stations }) => {
  console.log('stations', stations)
  return (
    <div>
      <h2>Helsinki city bike stations</h2>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Town</th>
      </tr>

      {stations.map((station) => (
        <tr key={station.id}>
          <td>{station.Nimi}</td>
          <td>{station.Adress}</td>
          <td>{station.Kaupunki}</td>
        </tr>
      ))}
    </div>
  )
}
export default StationList
