type errorProps = {
    errors: Record<string, string[]>,
    field: string
}

function ValidationError({ errors, field }: errorProps) {
  return errors?.[field]?.length &&
  <div className="text-red-500 bg-red-300" role="alert">
    <ul>
      { errors[field].map((error, index) => {
        return (<li key={ index }>{ error }</li>)
      }) }
    </ul>
  </div>
}

export default ValidationError