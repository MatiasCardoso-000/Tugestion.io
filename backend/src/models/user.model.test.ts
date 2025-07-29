// __tests__/models/user.model.test.ts

// Importamos la función que queremos probar
import { UserModel } from '../../src/models/user.model';
// Importamos el pool de la base de datos para poder simularlo
import { pool } from '../../src/database/db';

// --- SIMULACIÓN (MOCK) DEL MÓDULO DE LA BASE DE DATOS ---
// Le decimos a Jest que todas las llamadas a '../database/db' deben usar
// una versión simulada, no la real.
jest.mock('../../src/database/db', () => ({
  // Simulamos el pool de conexión
  pool: {
    // Simulamos la función 'query' del pool
    query: jest.fn(),
  },
}));

// --- SUITE DE PRUEBAS PARA EL MODELO DE USUARIO ---
describe('UserModel', () => {
  // Limpiamos todas las simulaciones después de cada prueba para que no interfieran entre sí
  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- PRUEBAS PARA LA FUNCIÓN 'create' ---
  describe('create', () => {
    // Test 1: El "Happy Path" - ¿Qué pasa cuando todo funciona bien?
    it('debe crear un usuario y devolver sus datos de forma segura', async () => {
      // 1. PREPARACIÓN (Arrange)
      // Datos de entrada para la prueba
      const input = {
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'hashed_password_string',
      };

      // Datos que esperamos que la base de datos devuelva
      const mockUser = {
        user_id: '1',
        username: 'testuser',
        email: 'test@example.com',
        role: 'user', // El rol por defecto que asigna la DB
      };

      // Configuramos nuestra simulación: cuando se llame a pool.query,
      // debe devolver el 'mockUser' que acabamos de definir.
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [mockUser],
      });

      // 2. ACTUACIÓN (Act)
      // Llamamos a la función que estamos probando
      const result = await UserModel.create(input);

      // 3. ASERCIÓN (Assert)
      // Comprobamos que el resultado sea el que esperamos
      expect(result).toEqual(mockUser);

      // Verificamos que se llamó a la base de datos con la consulta SQL correcta
      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(pool.query).toHaveBeenCalledWith(
        expect.objectContaining({
          text: expect.stringContaining('INSERT INTO USERS'),
          values: [input.username, input.email, input.password_hash],
        })
      );
    });

    // Test 2: El "Sad Path" - ¿Qué pasa si la base de datos da un error?
    it('debe lanzar un error si el email ya existe', async () => {
      // 1. PREPARACIÓN (Arrange)
      const input = {
        username: 'anotheruser',
        email: 'duplicate@example.com',
        password_hash: 'another_hash',
      };

      // Simulamos un error de la base de datos por violación de la restricción UNIQUE
      const dbError = {
        code: '23505', // Código de error de PostgreSQL para 'unique_violation'
        message: 'El email ya existe',
      };

      // Configuramos la simulación para que rechace la promesa con nuestro error
      (pool.query as jest.Mock).mockRejectedValue(dbError);

      // 2. ACTUACIÓN Y ASERCIÓN (Act & Assert)
      // Esperamos que la llamada a UserModel.create FALLE.
      // Usamos 'expect.assertions(1)' para asegurar que la prueba de 'rejects' se ejecute.
      expect.assertions(1);
      await expect(UserModel.create(input)).rejects.toEqual(dbError);
    });
  });
});
