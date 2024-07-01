"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LocalStorage = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	GlobalData_1 = require("../GlobalData"),
	EventDefine_1 = require("./Event/EventDefine"),
	EventSystem_1 = require("./Event/EventSystem"),
	LocalStorageDefine_1 = require("./LocalStorageDefine"),
	DBPATH = "LocalStorage/LocalStorage",
	DBSUFFIX = ".db",
	TABLENAME = "LocalStorage",
	DBNUM = 10,
	ISUSEDB = !0,
	USE_THREAD = !0,
	SQLITE_ERR = -1,
	SQLITE_NO_DATA = 1,
	USE_JOURNAL_MODE = 2;
function getJournalMode(e) {
	switch (e) {
		case 0:
			return "PRAGMA journal_mode=DELETE";
		case 1:
			return "PRAGMA journal_mode=TRUNCATE";
		case 2:
			return "PRAGMA journal_mode=PERSIST";
		case 3:
			return "PRAGMA journal_mode=MEMORY";
		case 4:
			return "PRAGMA journal_mode=OFF";
	}
}
class LocalStorage {
	static Initialize() {
		LocalStorage.cde(), LocalStorage.mde(), LocalStorage.dde();
	}
	static Destroy() {
		(LocalStorage.j8 = void 0), LocalStorage.Cde();
	}
	static GetGlobal(e, r = void 0) {
		if ((e = LocalStorage.gde(e)) && (e = LocalStorage.fde(e))[0])
			return (e = e[1]) ? LocalStorage.pde(e) : r;
	}
	static SetGlobal(e, r) {
		return (
			!!(e = LocalStorage.gde(e)) &&
			(null == r
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LocalStorage",
							31,
							"value值非法",
							["keyName", e],
							["value", r],
						),
					!1)
				: !!(r = LocalStorage.O8(r)) && LocalStorage.vde(e, r))
		);
	}
	static DeleteGlobal(e) {
		return !!(e = LocalStorage.gde(e)) && LocalStorage.Mde(e);
	}
	static GetPlayer(e, r = void 0) {
		if ((e = LocalStorage.Sde(e)) && (e = LocalStorage.fde(e))[0])
			return (e = e[1]) ? LocalStorage.pde(e) : r;
	}
	static SetPlayer(e, r) {
		return (
			!!(e = LocalStorage.Sde(e)) &&
			(null == r
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LocalStorage",
							31,
							"value值非法",
							["keyName", e],
							["value", r],
						),
					!1)
				: !!(r = LocalStorage.O8(r)) && LocalStorage.vde(e, r))
		);
	}
	static DeletePlayer(e) {
		return !!(e = LocalStorage.Sde(e)) && LocalStorage.Mde(e);
	}
	static cde() {
		var e;
		LocalStorage.Ede ||
			((e = UE.KismetSystemLibrary.GetProjectSavedDirectory()),
			(LocalStorage.Ede = e + DBPATH + ".db"));
	}
	static mde() {
		let e = LocalStorage.Ede,
			r = UE.KuroSqliteLibrary.OpenCreateDB(e, true);
		if (!r) {
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("LocalStorage", 31, "打开DB失败！", ["dbFilePath", e]);
			for (let o = 2; o <= 10; o++) {
				if (
					((e =
						UE.KismetSystemLibrary.GetProjectSavedDirectory() +
						DBPATH +
						o +
						".db"),
					(r = UE.KuroSqliteLibrary.OpenCreateDB(e, true)))
				) {
					LocalStorage.Ede = e;
					break;
				}
			}
			if (!r)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("LocalStorage", 31, "创建10次DB都失败！", [
							"dbFilePath",
							e,
						]),
					!1
				);
		}
		return (
			UE.KuroSqliteLibrary.Execute(e, getJournalMode(2)), LocalStorage.Ide()
		);
	}
	static Ide() {
		var e = LocalStorage.Ede,
			r = `create table if not exists ${TABLENAME}(key text primary key not null , value text not null)`;
		return (
			(e = UE.KuroSqliteLibrary.Execute(e, r)) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("LocalStorage", 31, "创建Table失败！", [
						"command",
						r,
					])),
			e
		);
	}
	static fde(e) {
		var r = LocalStorage.Ede,
			o =
				((e = `SELECT value FROM ${TABLENAME} WHERE key ='${e}'`),
				(0, puerts_1.$ref)(void 0));
		if (-1 === (r = UE.KuroSqliteLibrary.QueryValue(r, e, o)))
			return [!1, void 0];
		if (1 === r) return [!0, void 0];
		return [!0, (0, puerts_1.$unref)(o)];
	}
	static vde(e, r) {
		var o, t;
		return (
			(o = LocalStorage.Ede),
			(t = `insert into ${TABLENAME} (key,value) values('${e}' , '${r}') on CONFLICT(key) do update set value = '${r}'`),
			UE.KuroSqliteLibrary.ExecuteAsync(o, t),
			!0
		);
	}
	static Mde(e) {
		var r;
		return (
			(r = LocalStorage.Ede),
			(e = `delete from ${TABLENAME} where key = '${e}'`),
			UE.KuroSqliteLibrary.ExecuteAsync(r, e),
			!0
		);
	}
	static dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ChangePlayerInfoId,
			this.Lde,
		);
	}
	static Cde() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ChangePlayerInfoId,
			this.Lde,
		);
	}
	static gde(e) {
		if (null == e)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("LocalStorage", 31, "key值非法", ["key", e]);
		else {
			var r = LocalStorageDefine_1.ELocalStorageGlobalKey[e];
			if (r) return r;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("LocalStorage", 31, "keyName值非法", ["key", e]);
		}
	}
	static Sde(e) {
		if (null == e)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("LocalStorage", 31, "key值非法", ["key", e]);
		else {
			var r = LocalStorageDefine_1.ELocalStoragePlayerKey[e];
			if (r) {
				if (LocalStorage.j8) return r + "_" + LocalStorage.j8;
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LocalStorage",
						31,
						"尚未获取到playerId，无法操作Player相关的存储值！",
						["keyName", r],
					);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LocalStorage",
						31,
						"keyName值非法！",
						["key", e],
						["keyName", r],
					);
		}
	}
	static O8(e) {
		try {
			return JSON.stringify(e, LocalStorage.Dde);
		} catch (r) {
			r instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"LocalStorage",
						31,
						"序列化异常",
						r,
						["value", e],
						["error", r.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LocalStorage",
						31,
						"序列化异常",
						["value", e],
						["error", r],
					);
		}
	}
	static pde(e) {
		try {
			return JSON.parse(e, LocalStorage.Rde);
		} catch (r) {
			r instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"LocalStorage",
						31,
						"反序列化异常",
						r,
						["text", e],
						["error", r.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LocalStorage",
						31,
						"反序列化异常",
						["text", e],
						["error", r],
					);
		}
	}
}
((exports.LocalStorage = LocalStorage).Ede = void 0),
	(LocalStorage.j8 = void 0),
	(LocalStorage.yde = void 0),
	(LocalStorage.Tde = void 0),
	(LocalStorage.Lde = (e) => {
		(LocalStorage.j8 = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.LocalStorageInitPlayerId,
			);
	}),
	(LocalStorage.Dde = (e, r) => {
		if (void 0 === r) return "___undefined___";
		if (Number.isNaN(r)) return "___NaN___";
		if (r === 1 / 0) return "___Infinity___";
		if (r === -1 / 0) return "___-Infinity___";
		if (null === r) return null;
		switch (typeof r) {
			case "boolean":
				return r ? "___1B___" : "___0B___";
			case "bigint":
				return r + "___BI___";
			case "object":
				return r instanceof Map
					? { ___MetaType___: "___Map___", Content: Array.from(r.entries()) }
					: r instanceof Set
						? { ___MetaType___: "___Set___", Content: Array.from(r.values()) }
						: r;
			default:
				return r;
		}
	}),
	(LocalStorage.Rde = (e, r) => {
		if (null == r) return r;
		switch (typeof r) {
			case "string":
				switch (r) {
					case "___undefined___":
						return;
					case "___NaN___":
						return NaN;
					case "___Infinity___":
						return 1 / 0;
					case "___-Infinity___":
						return -1 / 0;
					default:
						{
							let e = r;
							if ("___1B___" === e) return !0;
							if ("___0B___" === e) return !1;
							if (e.endsWith("___BI___"))
								return (e = e.replace("___BI___", "")), BigInt(e);
						}
						return r;
				}
			case "object":
				var o = r;
				if (o?.___MetaType___) {
					if ("___Map___" === o.___MetaType___) return new Map(o.Content);
					if ("___Set___" === o.___MetaType___) return new Set(o.Content);
				}
				return r;
			default:
				return r;
		}
	});
