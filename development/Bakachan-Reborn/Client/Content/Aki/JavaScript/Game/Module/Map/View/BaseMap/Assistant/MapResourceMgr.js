"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapResourceMgr = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	FAKE_TILE_COUNT = 2;
class MapResourceMgr {
	constructor() {
		(this.ARi = new Array()),
			(this.PRi = 2),
			(this.xRi = void 0),
			(this.wRi = new Map());
	}
	GetPreloadMapTile() {
		return this.wRi;
	}
	async BRi(i) {
		const t = new CustomPromise_1.CustomPromise();
		return (
			ResourceSystem_1.ResourceSystem.LoadAsync(
				i,
				UE.Texture,
				(e) => {
					e && this.wRi.set(i, e), t.SetResult(void 0);
				},
				102,
			),
			t.Promise
		);
	}
	async PreloadMapAssets() {
		var i,
			t,
			e,
			s = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfig();
		this.ARi.splice(0, this.ARi.length);
		for (const a of s)
			StringUtils_1.StringUtils.IsEmpty(a.MapTilePath) ||
				((i = (i = a.MapTilePath.split("/"))[i.length - 1]),
				(t = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					a.MapTilePath,
				)),
				(e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					a.FogTilePath,
				)),
				this.ARi.push({ MapTilePath: t, FogTilePath: e, MapTileName: i }));
		let a = 0,
			r = 0;
		if (((this.xRi = { MaxX: -1, MinX: 1, MaxY: -1, MinY: 1 }), 1 === this.PRi))
			a = 4;
		else {
			for (const i of this.ARi) {
				var o = (n = this.bRi(i.MapTileName)).X,
					n = n.Y;
				(this.xRi.MaxX = Math.max(o, this.xRi.MaxX)),
					(this.xRi.MinX = Math.min(o, this.xRi.MinX)),
					(this.xRi.MaxY = Math.max(n, this.xRi.MaxY)),
					(this.xRi.MinY = Math.min(n, this.xRi.MinY));
			}
			(r = this.xRi.MaxX - this.xRi.MinX + 1 + 4),
				(a = r * (s = this.xRi.MaxY - this.xRi.MinY + 1 + 4));
		}
		var M = new Map();
		for (const i of this.ARi) {
			var h = this.bRi(i.MapTileName);
			M.set(h.X + "_" + h.Y, i);
		}
		var l = [];
		for (let i = 0; i < a; i++) {
			var R = i - ((g = Math.ceil((i + 1) / r)) - 1) * r + this.xRi.MinX - 2,
				g = -(g - 1) + this.xRi.MaxY + 2;
			(R = M.get(R + "_" + g)) &&
				(StringUtils_1.StringUtils.IsEmpty(R.MapTilePath) ||
					l.push(this.BRi(R.MapTilePath)),
				StringUtils_1.StringUtils.IsEmpty(R.FogTilePath) ||
					l.push(this.BRi(R.FogTilePath)),
				StringUtils_1.StringUtils.IsEmpty(R.HdMapTilePath) ||
					l.push(this.BRi(R.HdMapTilePath)));
		}
		await Promise.all(l);
	}
	Destroy() {
		this.wRi.clear();
	}
	bRi(i) {
		return (
			(i = i.split("_")),
			{
				X: UE.KismetStringLibrary.Conv_StringToInt(i[2]),
				Y: UE.KismetStringLibrary.Conv_StringToInt(i[3]),
			}
		);
	}
}
exports.MapResourceMgr = MapResourceMgr;
