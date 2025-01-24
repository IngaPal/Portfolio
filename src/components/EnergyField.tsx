
const EnergyField = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none min-w-full">
  <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse min-w-full" />
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse delay-75 min-w-full" />
  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse delay-150 min-w-full" />
</div>
  );
};

export default EnergyField;