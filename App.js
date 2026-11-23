import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
const PRODUCTOS_INICIALES = [
  {
    id: 'PROD-001',
    vendedor: 'FitStore',
    producto: 'Tenis Deportivos',
    categoria: 'Deporte',
    precio: 150000,
    descripcion: 'Cómodos tenis ligeros ideales para running y entrenamiento.',
    stock: 10,
    disponibilidad: true,
    resenas: [{ estrellas: 5, comentario: 'Muy cómodos para correr.' }],
  },
  {
    id: 'PROD-002',
    vendedor: 'TechShop',
    producto: 'Audífonos Bluetooth',
    categoria: 'Tecnología',
    precio: 85000,
    descripcion: 'Audífonos inalámbricos con estuche de carga y buen sonido.',
    stock: 5,
    disponibilidad: true,
    resenas: [{ estrellas: 4, comentario: 'Buena duración de batería.' }],
  },
  {
    id: 'PROD-003',
    vendedor: 'FitStore',
    producto: 'Botella Térmica 1L',
    categoria: 'Deporte',
    precio: 42000,
    descripcion: 'Termo deportivo en acero inoxidable para bebidas frías.',
    stock: 12,
    disponibilidad: true,
    resenas: [],
  },
  {
    id: 'PROD-004',
    vendedor: 'DecoHogar',
    producto: 'Lámpara LED Escritorio',
    categoria: 'Hogar',
    precio: 65000,
    descripcion: 'Lámpara recargable con tres niveles de intensidad de luz.',
    stock: 7,
    disponibilidad: true,
    resenas: [{ estrellas: 5, comentario: 'Alumbra muy bien para estudiar.' }],
  },
  {
    id: 'PROD-005',
    vendedor: 'Huellas',
    producto: 'Cama Acolchada Mascota',
    categoria: 'Mascotas',
    precio: 95000,
    descripcion: 'Cama suave lavable y antideslizante para perros o gatos.',
    stock: 4,
    disponibilidad: true,
    resenas: [],
  },
  {
    id: 'PROD-006',
    vendedor: 'TechShop',
    producto: 'Teclado Mecánico',
    categoria: 'Tecnología',
    precio: 180000,
    descripcion: 'Teclado compacto retroiluminado con cable USB desmontable.',
    stock: 3,
    disponibilidad: true,
    resenas: [{ estrellas: 5, comentario: 'Excelente para programar.' }],
  },
  {
    id: 'PROD-007',
    vendedor: 'FitStore',
    producto: 'Tapete de Yoga',
    categoria: 'Deporte',
    precio: 58000,
    descripcion: 'Colchoneta antideslizante de alta densidad con correa.',
    stock: 8,
    disponibilidad: true,
    resenas: [],
  },
  {
    id: 'PROD-008',
    vendedor: 'DecoHogar',
    producto: 'Set Organizador Cocina',
    categoria: 'Hogar',
    precio: 72000,
    descripcion: 'Juego de 4 recipientes herméticos apilables para alimentos.',
    stock: 6,
    disponibilidad: true,
    resenas: [],
  },
  {
    id: 'PROD-009',
    vendedor: 'Huellas',
    producto: 'Arnés Reflectivo Perro',
    categoria: 'Mascotas',
    precio: 38000,
    descripcion: 'Pechera ajustable transpirable para paseos nocturnos.',
    stock: 9,
    disponibilidad: true,
    resenas: [],
  },
  {
    id: 'PROD-010',
    vendedor: 'TechShop',
    producto: 'Soporte para Portátil',
    categoria: 'Tecnología',
    precio: 54000,
    descripcion: 'Base plegable ergonómica en aluminio para laptops.',
    stock: 11,
    disponibilidad: true,
    resenas: [],
  },
  {
    id: 'PROD-011',
    vendedor: 'DecoHogar',
    producto: 'Difusor Aromático',
    categoria: 'Hogar',
    precio: 89000,
    descripcion: 'Humidificador silencioso con luz ambiental y apagado auto.',
    stock: 5,
    disponibilidad: true,
    resenas: [],
  },
  {
    id: 'PROD-012',
    vendedor: 'Huellas',
    producto: 'Comedero Automático',
    categoria: 'Mascotas',
    precio: 135000,
    descripcion: 'Dispensador programable de alimento seco para mascotas.',
    stock: 0,
    disponibilidad: false,
    resenas: [{ estrellas: 4, comentario: 'Muy útil cuando salgo de casa.' }],
  },
];

export default function App() {
  const [vista, setVista] = useState('catalogo');
  const [vistaAnterior, setVistaAnterior] = useState('catalogo');
  const [mensaje, setMensaje] = useState('Bienvenido a Fitsitium');
  const [listaProductos, setListaProductos] = useState(PRODUCTOS_INICIALES);
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [idDetalle, setIdDetalle] = useState(null);
  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [ordenPrecio, setOrdenPrecio] = useState('ninguno');
  const [cuponInput, setCuponInput] = useState('');
  const [cuponActivo, setCuponActivo] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [municipioCliente, setMunicipioCliente] = useState('');
  const [direccionCliente, setDireccionCliente] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [vendedor, setVendedor] = useState('');
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [estrellasInput, setEstrellasInput] = useState('5');
  const [comentarioInput, setComentarioInput] = useState('');
  useEffect(() => {
    try {
      const guardado = globalThis?.localStorage?.getItem('fitsitium_datos');
      if (guardado) {
        const datos = JSON.parse(guardado);
        if (Array.isArray(datos.listaProductos) && datos.listaProductos.length > 0) {
          setListaProductos(
            datos.listaProductos.map((p) => ({
              ...p,
              stock: Math.max(0, Number(p.stock) || 0),
              precio: Math.max(1, Number(p.precio) || 1000),
            }))
          );
        }
        if (Array.isArray(datos.favoritos)) setFavoritos(datos.favoritos);
        if (Array.isArray(datos.carrito)) setCarrito(datos.carrito);
        if (Array.isArray(datos.historial)) setHistorial(datos.historial);
      }
    } catch (e) {
      // Si no hay almacenamiento disponible, continua con estado inicial
    }
  }, []);

  useEffect(() => {
    try {
      globalThis?.localStorage?.setItem(
        'fitsitium_datos',
        JSON.stringify({ listaProductos, favoritos, carrito, historial })
      );
    } catch (e) {}
  }, [listaProductos, favoritos, carrito, historial]);
  const abrirDetalle = (id) => {
    setVistaAnterior(vista);
    setIdDetalle(id);
    setEstrellasInput('5');
    setComentarioInput('');
    setVista('detalle');
  };
  const categorias = ['Todas', 'Deporte', 'Tecnología', 'Hogar', 'Mascotas'];

  const productosFiltrados = listaProductos
    .filter((item) => {
      const coincideNombre = item.producto.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCat = categoriaFiltro === 'Todas' || item.categoria === categoriaFiltro;
      return coincideNombre && coincideCat;
    })
    .sort((a, b) => {
      if (ordenPrecio === 'menor') return a.precio - b.precio;
      if (ordenPrecio === 'mayor') return b.precio - a.precio;
      return 0;
    });
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
      setMensaje('Quitado de favoritos');
    } else {
      setFavoritos([...favoritos, id]);
      setMensaje('Guardado en favoritos');
    }
  };
  const agregarAlCarrito = (item) => {
    const prodActual = listaProductos.find((p) => p.id === item.id);
    if (!prodActual || prodActual.stock <= 0 || !prodActual.disponibilidad) {
      setMensaje('Este producto está agotado');
      return;
    }

    const enCarrito = carrito.find((c) => c.id === prodActual.id);
    if (enCarrito) {
      if (enCarrito.cantidad + 1 > prodActual.stock) {
        setMensaje('No puedes superar el stock disponible (' + prodActual.stock + ')');
        return;
      }
      setCarrito(
        carrito.map((c) => (c.id === prodActual.id ? { ...c, cantidad: c.cantidad + 1 } : c))
      );
    } else {
      setCarrito([...carrito, { ...prodActual, cantidad: 1 }]);
    }
    setMensaje('Agregado al carrito: ' + prodActual.producto);
  };

  const cambiarCantidad = (id, cambio) => {
    const prodActual = listaProductos.find((p) => p.id === id);
    const itemCarrito = carrito.find((c) => c.id === id);
    if (!itemCarrito || !prodActual) return;

    const nuevaCantidad = itemCarrito.cantidad + cambio;

    if (nuevaCantidad < 1) {
      setMensaje('Usa el botón Eliminar para quitar este producto');
      return;
    }
    if (nuevaCantidad > prodActual.stock) {
      setMensaje('Stock máximo disponible: ' + prodActual.stock);
      return;
    }

    setCarrito(
      carrito.map((c) => (c.id === id ? { ...c, cantidad: nuevaCantidad } : c))
    );
    setMensaje('Cantidad actualizada');
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((c) => c.id !== id));
    setMensaje('Producto eliminado del carrito');
  };
  const aplicarCupon = () => {
    if (carrito.length === 0) {
      setMensaje('Agrega productos antes de usar un cupón');
      return;
    }
    if (cuponInput.trim().toUpperCase() === 'BIENVENIDO10') {
      setCuponActivo('BIENVENIDO10');
      setMensaje('Cupón BIENVENIDO10 aplicado (10% de descuento)');
    } else {
      setMensaje('Cupón no válido. Prueba con BIENVENIDO10');
    }
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const descuento = carrito.length > 0 && cuponActivo === 'BIENVENIDO10' ? Math.round(subtotal * 0.1) : 0;
  const envio = carrito.length === 0 ? 0 : subtotal < 150000 ? 8000 : 0;
  const total = carrito.length === 0 ? 0 : Math.max(0, subtotal - descuento + envio);
  const confirmarCompra = () => {
    if (!nombreCliente.trim()) {
      setMensaje('Falta ingresar tu nombre');
      return;
    }
    if (!telefonoCliente.trim()) {
      setMensaje('Falta ingresar tu teléfono');
      return;
    }
    if (!municipioCliente.trim()) {
      setMensaje('Falta ingresar tu municipio');
      return;
    }
    if (!direccionCliente.trim()) {
      setMensaje('Falta ingresar tu dirección');
      return;
    }
    const sinStock = carrito.find((item) => {
      const prod = listaProductos.find((p) => p.id === item.id);
      return !prod || prod.stock < item.cantidad;
    });

    if (sinStock) {
      setMensaje('Stock insuficiente para: ' + sinStock.producto);
      return;
    }
    const nuevaLista = listaProductos.map((prod) => {
      const comprado = carrito.find((c) => c.id === prod.id);
      if (!comprado) return prod;
      const nuevoStock = Math.max(0, prod.stock - comprado.cantidad);
      return {
        ...prod,
        stock: nuevoStock,
        disponibilidad: nuevoStock > 0,
      };
    });

    const nuevoPedido = {
      codigo: 'PED-' + (1001 + historial.length),
      fecha: new Date().toLocaleString(),
      cliente: {
        nombre: nombreCliente.trim(),
        telefono: telefonoCliente.trim(),
        municipio: municipioCliente.trim(),
        direccion: direccionCliente.trim(),
      },
      items: carrito.map((item) => ({ ...item })),
      subtotal,
      descuento,
      envio,
      total,
    };

    setListaProductos(nuevaLista);
    setHistorial([nuevoPedido, ...historial]);
    setCarrito([]);
    setCuponActivo('');
    setCuponInput('');
    setNombreCliente('');
    setTelefonoCliente('');
    setMunicipioCliente('');
    setDireccionCliente('');
    setPedidoDetalle(nuevoPedido);
    setVista('detallePedido');
    setMensaje('¡Compra simulada confirmada! (Sin cobro real)');
  };
  const limpiarFormularioVendedor = () => {
    setEditandoId(null);
    setVendedor('');
    setProducto('');
    setCategoria('');
    setPrecio('');
    setDescripcion('');
    setStock('');
    setDisponibilidad(true);
  };

  const iniciarEdicion = (item) => {
    setEditandoId(item.id);
    setVendedor(item.vendedor);
    setProducto(item.producto);
    setCategoria(item.categoria);
    setPrecio(String(item.precio));
    setDescripcion(item.descripcion);
    setStock(String(item.stock));
    setDisponibilidad(item.disponibilidad);
    setMensaje('Editando: ' + item.producto);
  };

  const guardarProducto = () => {
    const precioNum = Number(precio);
    const stockNum = Number(stock);

    if (!vendedor.trim()) {
      setMensaje('Ingrese el nombre del vendedor');
      return;
    }
    if (!producto.trim()) {
      setMensaje('Ingrese el nombre del producto');
      return;
    }
    if (!categoria.trim()) {
      setMensaje('Ingrese la categoría');
      return;
    }
    if (!precio.trim() || isNaN(precioNum) || precioNum <= 0 || !Number.isInteger(precioNum)) {
      setMensaje('El precio debe ser un entero positivo en COP');
      return;
    }
    if (descripcion.trim().length < 15) {
      setMensaje('La descripción debe tener mínimo 15 caracteres');
      return;
    }
    if (stock.trim() === '' || isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
      setMensaje('El stock debe ser un entero igual o mayor a 0');
      return;
    }

    if (editandoId) {
      setListaProductos(
        listaProductos.map((item) =>
          item.id === editandoId
            ? {
                ...item,
                vendedor: vendedor.trim(),
                producto: producto.trim(),
                categoria: categoria.trim(),
                precio: precioNum,
                descripcion: descripcion.trim(),
                stock: stockNum,
                disponibilidad: stockNum > 0 ? disponibilidad : false,
              }
            : item
        )
      );
      setMensaje('Producto actualizado sin duplicar');
    } else {
      const nuevoProducto = {
        id: 'PROD-' + String(listaProductos.length + 1).padStart(3, '0'),
        vendedor: vendedor.trim(),
        producto: producto.trim(),
        categoria: categoria.trim(),
        precio: precioNum,
        descripcion: descripcion.trim(),
        stock: stockNum,
        disponibilidad: stockNum > 0 ? disponibilidad : false,
        resenas: [],
      };
      setListaProductos([...listaProductos, nuevoProducto]);
      setMensaje('Producto agregado con ID ' + nuevoProducto.id);
    }
    limpiarFormularioVendedor();
  };

  const eliminarUnProducto = (id) => {
    const prod = listaProductos.find((p) => p.id === id);
    if (prod && prod.disponibilidad && prod.stock > 0) {
      setMensaje('Solo se pueden eliminar productos no disponibles');
      return;
    }
    setListaProductos(listaProductos.filter((p) => p.id !== id));
    if (editandoId === id) limpiarFormularioVendedor();
    setMensaje('Producto eliminado correctamente');
  };
  const guardarResena = (idProd) => {
    const valor = Number(estrellasInput);
    if (!Number.isInteger(valor) || valor < 1 || valor > 5) {
      setMensaje('Error: La calificación debe ser un número entero entre 1 y 5');
      return;
    }

    setListaProductos(
      listaProductos.map((item) =>
        item.id === idProd
          ? {
              ...item,
              resenas: [
                ...item.resenas,
                { estrellas: valor, comentario: comentarioInput.trim() || 'Buen producto' },
              ],
            }
          : item
      )
    );
    setComentarioInput('');
    setMensaje('Valoración de ' + valor + ' estrellas guardada');
  };

  const obtenerPromedio = (resenas) => {
    if (!resenas || resenas.length === 0) return 'Sin calificaciones';
    const suma = resenas.reduce((acc, r) => acc + r.estrellas, 0);
    return (suma / resenas.length).toFixed(1) + ' ★ (' + resenas.length + ')';
  };

  const prodDetalle = listaProductos.find((p) => p.id === idDetalle);
  const listaFavoritos = listaProductos.filter((p) => favoritos.includes(p.id));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Fitsitium</Text>
        <Text style={styles.brandSubtitle}>Tu tienda local · Mosquera, Madrid y Funza</Text>
      </View>
      <View style={styles.mensajeBox}>
        <Text style={styles.mensajeText}>{mensaje}</Text>
      </View>
      <View style={styles.menuTab}>
        <Pressable
          style={[styles.tabBtn, vista === 'catalogo' && styles.tabActive]}
          onPress={() => setVista('catalogo')}
        >
          <Text style={styles.tabText}>Catálogo</Text>
        </Pressable>
        <Pressable
          style={[styles.tabBtn, vista === 'favoritos' && styles.tabActive]}
          onPress={() => setVista('favoritos')}
        >
          <Text style={styles.tabText}>Favs ({favoritos.length})</Text>
        </Pressable>
        <Pressable
          style={[styles.tabBtn, (vista === 'carrito' || vista === 'checkout') && styles.tabActive]}
          onPress={() => setVista('carrito')}
        >
          <Text style={styles.tabText}>Carrito ({carrito.length})</Text>
        </Pressable>
        <Pressable
          style={[styles.tabBtn, (vista === 'historial' || vista === 'detallePedido') && styles.tabActive]}
          onPress={() => setVista('historial')}
        >
          <Text style={styles.tabText}>Pedidos ({historial.length})</Text>
        </Pressable>
        <Pressable
          style={[styles.tabBtn, vista === 'vendedor' && styles.tabActive]}
          onPress={() => setVista('vendedor')}
        >
          <Text style={styles.tabText}>Vendedor</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {vista === 'catalogo' && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Buscar producto..."
              value={busqueda}
              onChangeText={setBusqueda}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
              {categorias.map((cat) => (
                <Pressable
                  key={cat}
                  style={[styles.chipBtn, categoriaFiltro === cat && styles.tabActive]}
                  onPress={() => setCategoriaFiltro(cat)}
                >
                  <Text style={styles.chipText}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.rowGap}>
              <Pressable
                style={[styles.chipBtn, ordenPrecio === 'menor' && styles.tabActive]}
                onPress={() => setOrdenPrecio('menor')}
              >
                <Text style={styles.chipText}>Menor a mayor</Text>
              </Pressable>
              <Pressable
                style={[styles.chipBtn, ordenPrecio === 'mayor' && styles.tabActive]}
                onPress={() => setOrdenPrecio('mayor')}
              >
                <Text style={styles.chipText}>Mayor a menor</Text>
              </Pressable>
              {ordenPrecio !== 'ninguno' && (
                <Pressable style={styles.chipBtn} onPress={() => setOrdenPrecio('ninguno')}>
                  <Text style={styles.chipText}>Quitar orden</Text>
                </Pressable>
              )}
            </View>

            <Text style={styles.sectionTitle}>Catálogo ({productosFiltrados.length})</Text>

            {productosFiltrados.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No encontramos productos</Text>
                <Pressable
                  style={styles.btnSmall}
                  onPress={() => {
                    setBusqueda('');
                    setCategoriaFiltro('Todas');
                  }}
                >
                  <Text style={styles.btnSmallText}>Limpiar filtros</Text>
                </Pressable>
              </View>
            ) : (
              productosFiltrados.map((item) => {
                const esFav = favoritos.includes(item.id);
                const agotado = item.stock <= 0 || !item.disponibilidad;

                return (
                  <Pressable key={item.id} style={styles.card} onPress={() => abrirDetalle(item.id)}>
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imageText}>{item.producto[0].toUpperCase()}</Text>
                    </View>

                    <View style={styles.cardInfo}>
                      <View style={styles.rowBetween}>
                        <Text style={styles.cardTitle}>{item.producto}</Text>
                        <Pressable onPress={() => toggleFavorito(item.id)}>
                          <Text style={{ fontSize: 16, color: esFav ? '#C62828' : '#888' }}>
                            {esFav ? '♥' : '♡'}
                          </Text>
                        </Pressable>
                      </View>

                      <Text style={styles.cardCat}>
                        {item.categoria} · ${item.precio.toLocaleString('es-CO')} COP
                      </Text>
                      <Text style={{ fontSize: 11, color: agotado ? '#C62828' : 'green' }}>
                        {agotado ? 'Agotado' : 'Disponible (' + item.stock + ')'}
                      </Text>

                      <View style={styles.rowGap}>
                        <Pressable
                          style={[styles.btnSmall, agotado && { backgroundColor: '#DDD' }]}
                          onPress={() => agregarAlCarrito(item)}
                        >
                          <Text style={styles.btnSmallText}>{agotado ? 'Sin stock' : '+ Comprar'}</Text>
                        </Pressable>
                        <Pressable style={styles.btnSecundario} onPress={() => abrirDetalle(item.id)}>
                          <Text style={styles.btnSmallText}>Detalle</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Pressable>
                );
              })
            )}
          </View>
        )}
        {vista === 'detalle' && prodDetalle && (
          <View>
            <Pressable style={styles.btnSecundario} onPress={() => setVista(vistaAnterior)}>
              <Text style={styles.btnSmallText}>← Volver</Text>
            </Pressable>

            <View style={[styles.card, { flexDirection: 'column', alignItems: 'flex-start', marginTop: 8 }]}>
              <Text style={styles.cardCat}>{prodDetalle.id} · {prodDetalle.categoria}</Text>
              <Text style={[styles.brandTitle, { marginVertical: 4 }]}>{prodDetalle.producto}</Text>
              <Text style={styles.totalText}>${prodDetalle.precio.toLocaleString('es-CO')} COP</Text>
              <Text style={{ fontSize: 12, color: prodDetalle.stock > 0 ? 'green' : '#C62828', marginVertical: 4 }}>
                {prodDetalle.stock > 0 ? 'Stock disponible: ' + prodDetalle.stock : 'Agotado (0 unidades)'}
              </Text>
              <Text style={styles.cardDesc}>{prodDetalle.descripcion}</Text>
              <Text style={styles.cardCat}>Vendedor: {prodDetalle.vendedor}</Text>

              <View style={[styles.rowGap, { marginTop: 10 }]}>
                <Pressable
                  style={[styles.btnSmall, prodDetalle.stock <= 0 && { backgroundColor: '#DDD' }]}
                  onPress={() => agregarAlCarrito(prodDetalle)}
                >
                  <Text style={styles.btnSmallText}>
                    {prodDetalle.stock <= 0 ? 'Agotado' : '+ Agregar al carrito'}
                  </Text>
                </Pressable>
                <Pressable style={styles.btnSecundario} onPress={() => toggleFavorito(prodDetalle.id)}>
                  <Text style={styles.btnSmallText}>
                    {favoritos.includes(prodDetalle.id) ? '♥ En Favoritos' : '♡ Favorito'}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={[styles.card, { flexDirection: 'column', alignItems: 'flex-start' }]}>
              <Text style={styles.sectionTitle}>
                Reseñas · Promedio: {obtenerPromedio(prodDetalle.resenas)}
              </Text>
              <TextInput
                style={[styles.input, { width: '100%' }]}
                placeholder="Calificación (1 a 5 estrellas)"
                keyboardType="numeric"
                value={estrellasInput}
                onChangeText={setEstrellasInput}
              />
              <TextInput
                style={[styles.input, { width: '100%' }]}
                placeholder="Comentario breve (opcional)"
                value={comentarioInput}
                onChangeText={setComentarioInput}
              />
              <Pressable style={styles.btnSmall} onPress={() => guardarResena(prodDetalle.id)}>
                <Text style={styles.btnSmallText}>Guardar calificación</Text>
              </Pressable>

              {prodDetalle.resenas.map((r, i) => (
                <View key={i} style={{ marginTop: 8, borderTopWidth: 1, borderColor: '#EEE', width: '100%', paddingTop: 4 }}>
                  <Text style={styles.cardTitle}>{'★'.repeat(r.estrellas)} ({r.estrellas}/5)</Text>
                  <Text style={styles.cardDesc}>{r.comentario}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {vista === 'favoritos' && (
          <View>
            <Text style={styles.sectionTitle}>Mis Favoritos</Text>
            {listaFavoritos.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No tienes productos guardados en favoritos.</Text>
                <Pressable style={styles.btnSmall} onPress={() => setVista('catalogo')}>
                  <Text style={styles.btnSmallText}>Ir al catálogo</Text>
                </Pressable>
              </View>
            ) : (
              listaFavoritos.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>{item.producto[0]}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.producto}</Text>
                    <Text style={styles.cardCat}>${item.precio.toLocaleString('es-CO')} COP</Text>
                    <View style={styles.rowGap}>
                      <Pressable style={styles.btnSmall} onPress={() => agregarAlCarrito(item)}>
                        <Text style={styles.btnSmallText}>+ Al carrito</Text>
                      </Pressable>
                      <Pressable style={styles.btnDelete} onPress={() => toggleFavorito(item.id)}>
                        <Text style={styles.btnDeleteText}>Quitar</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
        {vista === 'carrito' && (
          <View>
            <Text style={styles.sectionTitle}>Carrito de Compras</Text>
            {carrito.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
                <Pressable style={styles.btnSmall} onPress={() => setVista('catalogo')}>
                  <Text style={styles.btnSmallText}>Explorar productos</Text>
                </Pressable>
              </View>
            ) : (
              <View>
                {carrito.map((item) => (
                  <View key={item.id} style={styles.card}>
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imageText}>{item.producto[0]}</Text>
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>{item.producto}</Text>
                      <Text style={styles.cardCat}>
                        ${item.precio.toLocaleString('es-CO')} x {item.cantidad} = $
                        {(item.precio * item.cantidad).toLocaleString('es-CO')} COP
                      </Text>

                      <View style={[styles.rowGap, { marginTop: 6 }]}>
                        <Pressable style={styles.btnSecundario} onPress={() => cambiarCantidad(item.id, -1)}>
                          <Text style={styles.btnSmallText}>-</Text>
                        </Pressable>
                        <Text style={{ fontWeight: 'bold', paddingHorizontal: 6 }}>{item.cantidad}</Text>
                        <Pressable style={styles.btnSecundario} onPress={() => cambiarCantidad(item.id, 1)}>
                          <Text style={styles.btnSmallText}>+</Text>
                        </Pressable>
                        <Pressable style={styles.btnDelete} onPress={() => eliminarDelCarrito(item.id)}>
                          <Text style={styles.btnDeleteText}>Eliminar</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ))}
                <View style={styles.rowGap}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Cupón (ej. BIENVENIDO10)"
                    value={cuponInput}
                    onChangeText={setCuponInput}
                  />
                  <Pressable style={styles.btnSmall} onPress={aplicarCupon}>
                    <Text style={styles.btnSmallText}>Aplicar</Text>
                  </Pressable>
                </View>
                <View style={styles.totalBox}>
                  <Text style={styles.cardCat}>Subtotal: ${subtotal.toLocaleString('es-CO')} COP</Text>
                  {descuento > 0 && (
                    <Text style={{ fontSize: 11, color: 'green' }}>
                      Descuento (BIENVENIDO10): -${descuento.toLocaleString('es-CO')} COP
                    </Text>
                  )}
                  <Text style={styles.cardCat}>
                    Envío: {envio === 0 ? 'GRATIS' : '$' + envio.toLocaleString('es-CO') + ' COP'}
                  </Text>
                  <Text style={[styles.totalText, { marginTop: 4 }]}>
                    Total a pagar: ${total.toLocaleString('es-CO')} COP
                  </Text>

                  <Pressable
                    style={[styles.btnMain, { width: '100%', marginTop: 10 }]}
                    onPress={() => setVista('checkout')}
                  >
                    <Text style={styles.btnMainText}>Continuar compra</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        )}
        {vista === 'checkout' && (
          <View>
            <Pressable style={styles.btnSecundario} onPress={() => setVista('carrito')}>
              <Text style={styles.btnSmallText}>← Volver al carrito</Text>
            </Pressable>

            <Text style={styles.sectionTitle}>Datos de Entrega (Simulación)</Text>
            <Text style={[styles.cardCat, { marginBottom: 8 }]}>
              Prototipo académico: no ingreses tarjetas ni datos bancarios reales.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre completo *"
              value={nombreCliente}
              onChangeText={setNombreCliente}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono *"
              keyboardType="phone-pad"
              value={telefonoCliente}
              onChangeText={setTelefonoCliente}
            />
            <TextInput
              style={styles.input}
              placeholder="Municipio (Mosquera, Madrid, Funza) *"
              value={municipioCliente}
              onChangeText={setMunicipioCliente}
            />
            <TextInput
              style={styles.input}
              placeholder="Dirección de entrega *"
              value={direccionCliente}
              onChangeText={setDireccionCliente}
            />

            <View style={styles.totalBox}>
              <Text style={styles.cardTitle}>Resumen del pedido:</Text>
              {carrito.map((c) => (
                <Text key={c.id} style={styles.cardCat}>
                  • {c.producto} x{c.cantidad} (${(c.precio * c.cantidad).toLocaleString('es-CO')})
                </Text>
              ))}
              <Text style={[styles.totalText, { marginTop: 6 }]}>
                Total: ${total.toLocaleString('es-CO')} COP
              </Text>
              <Pressable
                style={[styles.btnMain, { width: '100%', marginTop: 10 }]}
                onPress={confirmarCompra}
              >
                <Text style={styles.btnMainText}>Confirmar compra simulada</Text>
              </Pressable>
            </View>
          </View>
        )}
        {vista === 'historial' && (
          <View>
            <Text style={styles.sectionTitle}>Historial de Pedidos</Text>
            {historial.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>Aún no tienes pedidos confirmados.</Text>
                <Pressable style={styles.btnSmall} onPress={() => setVista('catalogo')}>
                  <Text style={styles.btnSmallText}>Ir a comprar</Text>
                </Pressable>
              </View>
            ) : (
              historial.map((ped) => (
                <Pressable
                  key={ped.codigo}
                  style={styles.card}
                  onPress={() => {
                    setPedidoDetalle(ped);
                    setVista('detallePedido');
                  }}
                >
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>
                      {ped.codigo} · ${ped.total.toLocaleString('es-CO')} COP
                    </Text>
                    <Text style={styles.cardCat}>Fecha: {ped.fecha}</Text>
                    <Text style={styles.cardDesc}>
                      Entrega: {ped.cliente.nombre} ({ped.cliente.municipio})
                    </Text>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        )}
        {vista === 'detallePedido' && pedidoDetalle && (
          <View>
            <Pressable style={styles.btnSecundario} onPress={() => setVista('historial')}>
              <Text style={styles.btnSmallText}>← Ver historial</Text>
            </Pressable>
            <View style={[styles.card, { flexDirection: 'column', alignItems: 'flex-start', marginTop: 8 }]}>
              <Text style={styles.brandTitle}>Pedido {pedidoDetalle.codigo}</Text>
              <Text style={styles.cardCat}>Fecha: {pedidoDetalle.fecha}</Text>
              <Text style={{ fontSize: 11, color: 'green', marginVertical: 4 }}>
                Simulación académica confirmada (sin cobro real)
              </Text>
              <Text style={styles.cardDesc}>
                Cliente: {pedidoDetalle.cliente.nombre} · Tel: {pedidoDetalle.cliente.telefono}
              </Text>
              <Text style={styles.cardDesc}>
                Dirección: {pedidoDetalle.cliente.municipio}, {pedidoDetalle.cliente.direccion}
              </Text>

              <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Productos:</Text>
              {pedidoDetalle.items.map((art, idx) => (
                <Text key={idx} style={styles.cardCat}>
                  • {art.producto} x{art.cantidad} (${art.precio.toLocaleString('es-CO')} c/u)
                </Text>
              ))}

              <Text style={[styles.cardCat, { marginTop: 8 }]}>
                Subtotal: ${pedidoDetalle.subtotal.toLocaleString('es-CO')} · Envío:{' '}
                {pedidoDetalle.envio === 0 ? 'GRATIS' : '$' + pedidoDetalle.envio.toLocaleString('es-CO')}
              </Text>
              <Text style={styles.totalText}>
                Total: ${pedidoDetalle.total.toLocaleString('es-CO')} COP
              </Text>
            </View>
          </View>
        )}
        {vista === 'vendedor' && (
          <View>
            <Text style={styles.sectionTitle}>
              {editandoId ? 'Editar Producto (' + editandoId + ')' : 'Panel de Vendedor'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre del vendedor"
              value={vendedor}
              onChangeText={setVendedor}
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre del producto"
              value={producto}
              onChangeText={setProducto}
            />
            <TextInput
              style={styles.input}
              placeholder="Categoría (Deporte, Tecnología, Hogar, Mascotas)"
              value={categoria}
              onChangeText={setCategoria}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio en COP"
              keyboardType="numeric"
              value={precio}
              onChangeText={setPrecio}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción (mín 15 caracteres)"
              value={descripcion}
              onChangeText={setDescripcion}
            />
            <TextInput
              style={styles.input}
              placeholder="Stock disponible"
              keyboardType="numeric"
              value={stock}
              onChangeText={setStock}
            />

            <Pressable style={styles.toggleBtn} onPress={() => setDisponibilidad(!disponibilidad)}>
              <Text style={styles.toggleText}>
                ¿Disponible?: {disponibilidad ? 'Sí' : 'No'}
              </Text>
            </Pressable>

            <View style={styles.rowGap}>
              <Pressable style={[styles.btnMain, { flex: 1 }]} onPress={guardarProducto}>
                <Text style={styles.btnMainText}>
                  {editandoId ? 'Actualizar Producto' : 'Guardar Producto'}
                </Text>
              </Pressable>
              {editandoId && (
                <Pressable style={styles.btnSecundario} onPress={limpiarFormularioVendedor}>
                  <Text style={styles.btnSmallText}>Cancelar</Text>
                </Pressable>
              )}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Inventario de Tienda</Text>

            {listaProductos.map((item) => (
              <View key={item.id} style={styles.cardAdmin}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    {item.producto} (${item.precio.toLocaleString('es-CO')})
                  </Text>
                  <Text style={{ fontSize: 11, color: item.disponibilidad ? 'green' : 'red' }}>
                    {item.id} · Stock: {item.stock} · {item.disponibilidad ? 'Disponible' : 'No disponible'}
                  </Text>
                </View>

                <View style={styles.rowGap}>
                  <Pressable style={styles.btnSmall} onPress={() => iniciarEdicion(item)}>
                    <Text style={styles.btnSmallText}>Editar</Text>
                  </Pressable>
                  <Pressable style={styles.btnDelete} onPress={() => eliminarUnProducto(item.id)}>
                    <Text style={styles.btnDeleteText}>Eliminar</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F5',
    paddingTop: 40,
    paddingHorizontal: 14,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181818',
  },
  brandSubtitle: {
    fontSize: 11,
    color: '#666',
  },
  mensajeBox: {
    backgroundColor: '#EFECE6',
    padding: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  mensajeText: {
    fontSize: 11,
    color: '#181818',
    textAlign: 'center',
    fontWeight: '600',
  },
  menuTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#EFECE6',
    borderRadius: 8,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#C5E188',
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#181818',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#181818',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
    marginBottom: 8,
    fontSize: 13,
  },
  chipBtn: {
    backgroundColor: '#EFECE6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 6,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#181818',
  },
  rowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 55,
    height: 55,
    backgroundColor: '#EFECE6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7EA83B',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#181818',
  },
  cardCat: {
    fontSize: 11,
    color: '#666',
  },
  cardDesc: {
    fontSize: 11,
    color: '#444',
    marginVertical: 2,
  },
  btnSmall: {
    backgroundColor: '#C5E188',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  btnSecundario: {
    backgroundColor: '#EFECE6',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  btnSmallText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#181818',
  },
  btnMain: {
    backgroundColor: '#C5E188',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnMainText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#181818',
  },
  emptyBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
    fontSize: 12,
  },
  totalBox: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#181818',
  },
  cardAdmin: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  btnDelete: {
    backgroundColor: '#FFCDD2',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  btnDeleteText: {
    color: '#C62828',
    fontWeight: 'bold',
    fontSize: 11,
  },
  toggleBtn: {
    backgroundColor: '#EFECE6',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#181818',
  },
});