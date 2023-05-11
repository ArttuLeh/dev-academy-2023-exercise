const JourneysList = ({ journeys }) => {
  console.log('journeys', journeys)
  return (
    <div>
      <h2>Helsinki city bike journeys</h2>
      <tr>
        <th>Departure station id</th>
        <th>Departure station name</th>
        <th>Covered distance m</th>
        <th>Duration sec</th>
      </tr>

      {journeys.map((journey) => (
        <tr key={journey.id}>
          <td>{journey.Departure_station_id}</td>
          <td>{journey.Departure_station_name}</td>
          <td>{journey.Covered_distance_m}</td>
          <td>{journey.Duration_sec}</td>
        </tr>
      ))}
    </div>
  )
}
export default JourneysList
