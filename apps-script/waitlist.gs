/**
 * Lista de espera da Pantaleon Systems: grava cada cadastro numa linha da planilha.
 * Cole este código em Extensões > Apps Script, na própria planilha.
 * Passo a passo completo em docs/waitlist-apps-script.md.
 */

const SHEET_NAME = 'Lista de espera'
const HEADERS = ['Data/hora', 'Nome', 'WhatsApp', 'Instagram', 'Perfil', 'Consentimento']
const PROFILES = ['Afiliado', 'Loja', 'Criador']

function doPost(e) {
  const lock = LockService.getScriptLock()
  try {
    lock.waitLock(10000)

    const data = JSON.parse(e.postData.contents)
    const error = validate(data)
    if (error) return json({ ok: false, error: error })

    const sheet = getSheet()
    sheet.appendRow([
      new Date(),
      String(data.nome).trim(),
      "'" + String(data.whatsapp), // apóstrofo: mantém como texto, sem perder zeros
      String(data.instagram),
      data.perfil,
      data.consentimento ? 'Sim' : 'Não',
    ])
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: 'erro interno' })
  } finally {
    lock.releaseLock()
  }
}

// Abrir a URL do Web App no navegador só confirma que está no ar.
function doGet() {
  return json({ ok: true, service: 'lista-de-espera' })
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = spreadsheet.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME)
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
  }
  return sheet
}

// A mesma regra do site, repetida aqui porque o endpoint é público.
function validate(data) {
  if (!data || typeof data !== 'object') return 'dados inválidos'
  if (String(data.nome || '').trim().length < 2) return 'nome'
  if (!/^\d{10,13}$/.test(String(data.whatsapp || ''))) return 'whatsapp'
  if (!/^[A-Za-z0-9._]{1,30}$/.test(String(data.instagram || ''))) return 'instagram'
  if (PROFILES.indexOf(data.perfil) === -1) return 'perfil'
  if (data.consentimento !== true) return 'consentimento'
  return ''
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
