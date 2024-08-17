"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	EffectContext_1 = require("./EffectContext/EffectContext"),
	EffectParameterNiagara_1 = require("./EffectParameter/EffectParameterNiagara"),
	EffectSystem_1 = require("./EffectSystem");
class TsEffectFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static SpawnEffect(e, t, r, f, o, c) {
		if (t?.IsValid())
			if (o) {
				var a;
				if (!(o.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT))
					return (
						(a = `[蓝图:${t.GetName()}] ` + o),
						EffectSystem_1.EffectSystem.SpawnEffect(
							e,
							f,
							r,
							a,
							new EffectContext_1.EffectContext(void 0, t),
						) ?? 0
					);
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"TsEffectFunctionLibrary.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量",
						["蓝图对象", t.GetName()],
						["Reason", o],
						["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
					);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"TsEffectFunctionLibrary.SpawnEffectWithActor的Reason不能使用undefined",
						["蓝图对象", t.GetName()],
						["Reason", o],
					);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderEffect",
					3,
					"TsEffectFunctionLibrary.SpawnEffect失败，因为CallObject无效",
					["Path", r],
					["Reason", o],
				);
	}
	static SpawnEffectUI(e, t, r, f, o) {
		if (t?.IsValid())
			if (o) {
				var c;
				if (!(o.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT))
					return (
						(c = `[蓝图:${t.GetName()}] ` + o),
						EffectSystem_1.EffectSystem.SpawnEffect(
							e,
							f,
							r,
							c,
							new EffectContext_1.EffectContext(void 0, t),
							1,
						) ?? 0
					);
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"TsEffectFunctionLibrary.SpawnEffectUI的Reason字符串长度必须大于等于限制字符数量",
						["蓝图对象", t.GetName()],
						["Reason", o],
						["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
					);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"TsEffectFunctionLibrary.SpawnEffectUI的Reason不能使用undefined",
						["蓝图对象", t.GetName()],
						["Reason", o],
					);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderEffect",
					3,
					"TsEffectFunctionLibrary.SpawnEffectUI失败，因为CallObject无效",
					["Path", r],
					["Reason", o],
				);
	}
	static SpawnEffectWithActor(e, t, r, f, o, c, a) {
		var E = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
		if (2 === E || 4 === E)
			if (r?.IsValid())
				if (t?.IsValid())
					if (o) {
						if (!(o.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT))
							return (
								(E = `[蓝图:${t.GetName()}] ` + o),
								EffectSystem_1.EffectSystem.SpawnEffectWithActor(
									e,
									void 0,
									r,
									f,
									E,
									!0,
									new EffectContext_1.EffectContext(void 0, t),
									void 0,
									void 0,
									!1,
									void 0,
									a.valueOf(),
								)
							);
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Entity",
								3,
								"TsEffectFunctionLibrary.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量",
								["蓝图对象", t.GetName()],
								["Reason", o],
								["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
							);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Entity",
								3,
								"TsEffectFunctionLibrary.SpawnEffectWithActor的Reason不能使用undefined",
								["蓝图对象", t.GetName()],
								["Reason", o],
							);
				else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"SpawnEffectWithActor失败，因为CallObject无效",
							["Actor", r.GetName()],
							["Reason", o],
						);
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"TsEffectFunctionLibrary.SpawnEffectWithActor失败，因为effectActor参数无效",
						["Reason", o],
					);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderEffect",
					30,
					"TsEffectFunctionLibrary.SpawnEffectWithActor仅能于编辑时调用",
					["Path", f],
					["Reason", o],
				);
	}
	static InitializeWithPreview(e) {
		EffectSystem_1.EffectSystem.InitializeWithPreview(e);
	}
	static EffectHandleIsValid(e) {
		return EffectSystem_1.EffectSystem.IsValid(e);
	}
	static StopEffect(e, t, r, f, o) {
		var c;
		return t?.IsValid()
			? r
				? r.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Entity",
								3,
								"TsEffectFunctionLibrary.StopEffect的Reason字符串长度必须大于等于限制字符数量",
								["蓝图对象", t.GetName()],
								["Reason", r],
								["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
							),
						!1)
					: e
						? ((c = `[蓝图:${t.GetName()}] ` + r),
							EffectSystem_1.EffectSystem.StopEffectById(e, c, f))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"RenderEffect",
									3,
									"特效句柄无效",
									["CallObject", t.GetName()],
									["Reason", r],
									["Handle", e],
								),
							!1)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"TsEffectFunctionLibrary.StopEffect的Reason不能使用undefined",
							["蓝图对象", t.GetName()],
							["Reason", r],
							["Handle", e],
						),
					!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"CallObject无效",
						["Reason", r],
						["Handle", e],
					),
				!1);
	}
	static PlayEffect(e, t, r) {
		return t?.IsValid()
			? r
				? r.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Entity",
								3,
								"TsEffectFunctionLibrary.PlayEffect的Reason字符串长度必须大于等于限制字符数量",
								["蓝图对象", t.GetName()],
								["Reason", r],
								["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
							),
						!1)
					: !!e ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"RenderEffect",
								3,
								"特效句柄无效",
								["CallObject", t.GetName()],
								["Reason", r],
								["Handle", e],
							),
						!1)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"TsEffectFunctionLibrary.PlayEffect的Reason不能使用undefined",
							["蓝图对象", t.GetName()],
							["Reason", r],
							["Handle", e],
						),
					!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"CallObject无效",
						["Reason", r],
						["Handle", e],
					),
				!1);
	}
	static SetEffectParameterNiagara(e, t, r, f, o, c) {
		if (e) {
			var a = new EffectParameterNiagara_1.EffectParameterNiagara();
			if (t) {
				var E = (0, puerts_1.$unref)(t),
					n = E.Num();
				if (0 < n) {
					a.UserParameterFloat = [];
					for (let e = 0; e < n; ++e)
						a.UserParameterFloat.push([E.Get(e).Name, E.Get(e).Value]);
				}
			}
			if (r) {
				var i = (0, puerts_1.$unref)(r),
					s = i.Num();
				if (0 < s) {
					a.UserParameterColor = [];
					for (let e = 0; e < s; ++e)
						a.UserParameterColor.push([i.Get(e).Name, i.Get(e).Value]);
				}
			}
			if (f) {
				var L = (0, puerts_1.$unref)(f),
					_ = L.Num();
				if (0 < _) {
					a.UserParameterVector = [];
					for (let e = 0; e < _; ++e)
						a.UserParameterVector.push([L.Get(e).Name, L.Get(e).Value]);
				}
			}
			if (o) {
				var g = (0, puerts_1.$unref)(o),
					m = g.Num();
				if (0 < m) {
					a.MaterialParameterFloat = [];
					for (let e = 0; e < m; ++e)
						a.MaterialParameterFloat.push([g.Get(e).Name, g.Get(e).Value]);
				}
			}
			if (c) {
				var S = (0, puerts_1.$unref)(c),
					l = S.Num();
				if (0 < l) {
					a.MaterialParameterColor = [];
					for (let e = 0; e < l; ++e)
						a.MaterialParameterColor.push([S.Get(e).Name, S.Get(e).Value]);
				}
			}
			EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, a);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("RenderEffect", 26, "特效句柄无效");
	}
	static EditorTickHandle(e, t) {
		EffectSystem_1.EffectSystem.TickHandleInEditor(e, t);
	}
	static GetEffectActor(e) {
		return EffectSystem_1.EffectSystem.GetSureEffectActor(e);
	}
	static GetPlayType(e) {
		switch (e) {
			case 1:
				return !0;
			case 2:
				return !1;
			default:
				return;
		}
	}
	static AttachEffectActorToActor(e, t, r, f, o, c, a) {
		EffectSystem_1.EffectSystem.IsValid(e) &&
			t &&
			EffectSystem_1.EffectSystem.GetEffectActor(e).K2_AttachToActor(
				t,
				r,
				f,
				o,
				c,
				a,
			);
	}
	static AttachEffectActorToComponent(e, t, r, f, o, c, a) {
		EffectSystem_1.EffectSystem.IsValid(e) &&
			t &&
			EffectSystem_1.EffectSystem.GetEffectActor(e).K2_AttachToComponent(
				t,
				r,
				f,
				o,
				c,
				a,
			);
	}
	static SetEffectActorRelativeLocation(e, t, r, f) {
		EffectSystem_1.EffectSystem.IsValid(e) &&
			EffectSystem_1.EffectSystem.GetEffectActor(e).K2_SetActorRelativeLocation(
				t,
				r,
				void 0,
				f,
			);
	}
	static SetEffectHiddenInGame(e, t) {
		EffectSystem_1.EffectSystem.IsValid(e)
			? EffectSystem_1.EffectSystem.GetEffectActor(e).SetActorHiddenInGame(t)
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"RenderEffect",
					46,
					"设置EffectHiddenInGame,但找不到对应",
					["handle", e],
				);
	}
	static SetEffectIgnoreVisibilityOptimize(e, t) {
		EffectSystem_1.EffectSystem.IsValid(e)
			? EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(e, t)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"RenderEffect",
					37,
					"设置EffectIgnoreVisibilityOptimize，句柄失效",
					["handle", e],
				);
	}
	static SetEffectStoppingTime(e, t) {
		EffectSystem_1.EffectSystem.IsValid(e)
			? EffectSystem_1.EffectSystem.SetEffectStoppingTime(e, t)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("RenderEffect", 37, "设置EffectStoppingTime，句柄失效", [
					"handle",
					e,
				]);
	}
	static SetGlobalStoppingTime(e, t) {
		EffectSystem_1.EffectSystem.SetGlobalStoppingTime(e, t);
	}
}
exports.default = TsEffectFunctionLibrary;
