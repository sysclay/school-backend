export class Validators  {
  static capitalizar(value:string):string {
    return value
    .toLowerCase()
    .split(' ')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
  }

  static isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static isValidPhone(phone: string): boolean {
      const regex = /^(?:\+?51)?(?:\d{9}|\d{7,8})$/;
      return regex.test(phone);
  }

  static isFechaValida(fechaStr:string) {
    // Validar formato YYYY-MM-DD
    fechaStr = fechaStr.trim();
    const formatoValido = /^\d{4}-\d{2}-\d{2}$/;
    if (!formatoValido.test(fechaStr)) return false;
    const [anio, mes, dia] = fechaStr.split('-').map(Number);
    const fecha = new Date(anio,mes-1,dia);
    const esValida = ( fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia);
    return esValida;
  }

  static isYearValida(anioInput :string):boolean {
    const anio = parseInt(anioInput.trim());
    if (isNaN(anio)) return false;
    const anioActual = new Date().getFullYear();
    return anio >= 1000 && anio <= anioActual;
  }

  static isHoraPeru() {
    // Validar formato HH:mm:ss
    const formatter  = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
    let horaPeru:any;
    if (formatter.startsWith('24')) { horaPeru = formatter.replace(/^24/, '00'); }
    return horaPeru===undefined?formatter:horaPeru;
  }

  static isFechaPeru() {
    const fechaPeru = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
    // Convertimos al formato ISO (YYYY-MM-DD)
    const partes = fechaPeru.split('/');
    const fechaISO = `${partes[2]}-${partes[1]}-${partes[0]}`;

    return fechaISO;
  }

  static isYearPeru() {
    const fechaPeru = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
    // Convertimos al formato ISO (YYYY-MM-DD)
    const partes = fechaPeru.split('/');
    const yearISO = `${partes[2]}`;

    return yearISO;
  }
}